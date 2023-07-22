export const getOneInchData = async (address: string, amount: number) => {
    const url = 'https://api.1inch.dev/swap/v5.2/1/swap';
    const srcAddress = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
    const dstAddress = '0x111111111117dc0aa78b770fa6a738034120c302';
    const fromAddress = address
    const slippage = '50';
    const headers = {
        'accept': 'application/json',
        'Authorization': `Bearer ${process.env.ONE_INCH_API_KEY}`
    };
    const queryString = new URLSearchParams({
        src: srcAddress,
        dst: dstAddress,
        amount: amount.toString(),
        from: fromAddress,
        slippage: slippage,
        disableEstimate: 'true'
    }).toString();
    const fetchOptions = {
        method: 'GET',
        headers: headers
    };
    const apiUrl = `${url}?${queryString}`;
    const response = await fetch(apiUrl, fetchOptions)
    const { tx } = await response.json();
    return tx.data
}