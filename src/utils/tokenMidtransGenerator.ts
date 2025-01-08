import { MidtransClient } from "midtrans-node-client";

export const tokenMidtransGenerator = async (
  parameter: any
): Promise<string> => {
  let snap = new MidtransClient.Snap({
    isProduction: false,
    serverKey: "SB-Mid-server-sQDfXDlqNKvrE8E7pAsJU8hi",
    clientKey: "SB-Mid-client-JuIn72sBaReyPMcG",
  });

  console.log(process.env.SECRET);
  console.log(process.env.NEXT_PUBLIC_CLIENT);

  try {
    const tokenMidtrans = await snap.createTransactionToken(parameter);
    // console.log(tokenMidtrans);

    return tokenMidtrans;
  } catch (error) {
    console.log(error);
    return "Midtrans e error bang";
  }
};
