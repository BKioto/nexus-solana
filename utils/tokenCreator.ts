import { 
    Connection, 
    PublicKey, 
    SystemProgram, 
    Transaction, 
    Keypair, 
    LAMPORTS_PER_SOL
} from "@solana/web3.js";
import { 
    TOKEN_PROGRAM_ID, 
    createInitializeMintInstruction, 
    getMinimumBalanceForRentExemptMint, 
    MINT_SIZE,
    createAssociatedTokenAccountInstruction,
    createMintToInstruction,
    getAssociatedTokenAddress
} from "@solana/spl-token";
import { 
    createCreateMetadataAccountV3Instruction, 
    PROGRAM_ID as METADATA_PROGRAM_ID 
} from "@metaplex-foundation/mpl-token-metadata";
import { WalletContextState } from "@solana/wallet-adapter-react";

// آدرس کیف پول مدیر برای دریافت کارمزد
const ADMIN_WALLET = new PublicKey("DhP4KRcguQ9EFcWVku2HKL6H5Tm3sKVAwLATGrTtad8s");

// تابع اصلی ساخت توکن
export async function createToken(
    connection: Connection,
    wallet: WalletContextState,
    tokenName: string,
    tokenSymbol: string,
    tokenUri: string, // آدرس جیسون در پیناتا
    tokenSupply: number // تعداد سکه‌ها
) {
    // ۱. بررسی اتصال کیف پول
    if (!wallet.publicKey || !wallet.signTransaction) {
        // تغییر مهم: پیام خطای سیستمی به انگلیسی
        throw new Error("Wallet not connected!");
    }

    // ۲. تولید کلید برای توکن جدید (Mint Account)
    const mintKeypair = Keypair.generate(); 
    
    // ۳. محاسبه هزینه اجاره در شبکه
    const lamports = await getMinimumBalanceForRentExemptMint(connection);

    // ۴. پیدا کردن آدرس استاندارد برای ذخیره متادیتا (PDA)
    const [metadataPDA] = PublicKey.findProgramAddressSync(
        [
            Buffer.from("metadata"),
            METADATA_PROGRAM_ID.toBuffer(),
            mintKeypair.publicKey.toBuffer(),
        ],
        METADATA_PROGRAM_ID
    );

    // ۵. پیدا کردن آدرس کیف پول کاربر برای واریز توکن‌ها (ATA)
    const userTokenAccount = await getAssociatedTokenAddress(
        mintKeypair.publicKey,
        wallet.publicKey
    );

    // ۶. ساخت بسته تراکنش
    const transaction = new Transaction().add(
        
        // مرحله صفر: واریز کارمزد به حساب مدیر
        SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: ADMIN_WALLET,
            lamports: 0.02 * LAMPORTS_PER_SOL,
        }),

        // مرحله اول: ساخت اکانت توکن
        SystemProgram.createAccount({
            fromPubkey: wallet.publicKey,
            newAccountPubkey: mintKeypair.publicKey,
            space: MINT_SIZE,
            lamports,
            programId: TOKEN_PROGRAM_ID,
        }),
        
        // مرحله دوم: تنظیمات اولیه (تعداد اعشار = ۹)
        createInitializeMintInstruction(
            mintKeypair.publicKey,
            9, 
            wallet.publicKey,
            wallet.publicKey,
            TOKEN_PROGRAM_ID
        ),
        
        // مرحله سوم: ساخت اکانت مقصد برای کاربر
        createAssociatedTokenAccountInstruction(
            wallet.publicKey,
            userTokenAccount,
            wallet.publicKey,
            mintKeypair.publicKey
        ),
        
        // مرحله چهارم: ضرب سکه‌ها
        createMintToInstruction(
            mintKeypair.publicKey,
            userTokenAccount,
            wallet.publicKey,
            tokenSupply * (10 ** 9)
        ),

        // مرحله پنجم: ثبت متادیتا
        createCreateMetadataAccountV3Instruction(
            {
                metadata: metadataPDA,
                mint: mintKeypair.publicKey,
                mintAuthority: wallet.publicKey,
                payer: wallet.publicKey,
                updateAuthority: wallet.publicKey,
            },
            {
                createMetadataAccountArgsV3: {
                    data: {
                        name: tokenName,
                        symbol: tokenSymbol,
                        uri: tokenUri,
                        sellerFeeBasisPoints: 0,
                        creators: null,
                        collection: null,
                        uses: null,
                    },
                    isMutable: true,
                    collectionDetails: null,
                },
            }
        )
    );

    // ۷. امضا و ارسال تراکنش
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = wallet.publicKey;

    transaction.partialSign(mintKeypair);

    const signature = await wallet.sendTransaction(transaction, connection);

    return { signature, mintAddress: mintKeypair.publicKey.toBase58() };
}