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
    // تغییر مهم: خطا به انگلیسی (خنثی)
    throw new Error("Failed to upload image to IPFS.");
  }
};

// ۲. تابع آپلود مشخصات (Metadata) به IPFS
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
    // تغییر مهم: خطا به انگلیسی (خنثی)
    throw new Error("Failed to upload metadata to IPFS.");
  }
};