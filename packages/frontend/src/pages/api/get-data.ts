// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getOneInchData } from '@/utils/actions/1inch'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    data: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === 'POST') {
        const {
            address,
            amount
        } = req.body
        const data = await getOneInchData(address, Number(amount))
        res.status(200).json({ data })
    } else {
        res.status(200).json({ data: 'John Doe' })
    }


}
