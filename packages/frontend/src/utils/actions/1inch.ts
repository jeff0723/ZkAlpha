export const getOneInchData = async (address: string, amount: number) => {
    const url = 'https://api.1inch.dev/swap/v5.2/100/swap';
    const srcAddress = '0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83';
    const dstAddress = '0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1';
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