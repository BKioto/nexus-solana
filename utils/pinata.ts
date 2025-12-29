const JWT = process.env.NEXT_PUBLIC_PINATA_JWT;

// ۱. تابع آپلود فایل (عکس) به IPFS
export const uploadFileToIPFS = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const metadata = JSON.stringify({
      name: `Nexus Image - ${file.name}`,
    });
    formData.append("pinataMetadata", metadata);

    const options = JSON.stringify({
      cidVersion: 0,
    });
    formData.append("pinataOptions", options);

    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
      body: formData,
    });

    const resData = await res.json();
    return resData.IpfsHash; // این همان آدرس عکس در اینترنت است
  } catch (error) {
    console.error("Error uploading file to IPFS:", error);
    throw new Error("آپلود عکس با خطا مواجه شد.");
  }
};

// ۲. تابع آپلود مشخصات (Metadata) به IPFS
// سولانا برای شناختن توکن، نیاز به یک فایل متنی JSON دارد که آدرس عکس و نام توکن داخلش باشد
export const uploadMetadataToIPFS = async (
  name: string,
  symbol: string,
  description: string,
  imageHash: string
): Promise<string> => {
  try {
    const metadata = {
      name: name,
      symbol: symbol,
      description: description,
      image: `https://gateway.pinata.cloud/ipfs/${imageHash}`,
    };

    const res = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JWT}`,
      },
      body: JSON.stringify(metadata),
    });

    const resData = await res.json();
    return `https://gateway.pinata.cloud/ipfs/${resData.IpfsHash}`; // آدرس نهایی شناسنامه توکن
  } catch (error) {
    console.error("Error uploading metadata to IPFS:", error);
    throw new Error("آپلود مشخصات توکن با خطا مواجه شد.");
  }
};