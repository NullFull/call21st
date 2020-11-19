import axios from 'axios'
import { makeResponse } from 'utils/api'

const SHEET_ID = `1_SO8mRpe62p3l0Lv45ItL5Ocr61KC17sfoUImW6W8jw`
const PAGE = 2
const SHEET_URL = `https://spreadsheets.google.com/feeds/cells/${SHEET_ID}/${PAGE}/public/full?alt=json`

const getProposalList = async () => {
  const res = await axios.get(SHEET_URL)
  const entries = res.data.feed.entry
  const rowNum = Number(entries[entries.length - 1].gs$cell.row)

  const entryObjects = []
  const proposalList = []

  for (let i = 0; i < rowNum; i++) {
    const entriesInRow = entries.filter(entry => {
      return Number(entry.gs$cell.row) === i + 1
    })
    entryObjects.push(entriesInRow)
  }

  entryObjects.forEach(row => {
    proposalList.push({
      name: row[0].content.$t,
      party: row[1].content.$t,
      sex: row[2].content.$t,
      location: row[3].content.$t,
      proposal: row[4].content.$t
    })
  })

  return proposalList
}


export default async (req, res) => {
  const proposals = await getProposalList()
  makeResponse(res, { proposals })
}
