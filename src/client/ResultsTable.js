import React from 'react'
import ResultsRow from './ResultsRow'

const ResultsTable = ({results, onHeaderClick}) => (
  <table className="table" style={{fontWeight:'600'}}>
    <thead>
      <tr>
        <th><a onClick={e => { e.preventDefault(); onHeaderClick('title') }}>Title</a></th>
        <th><a onClick={e => { e.preventDefault(); onHeaderClick('price') }}>Price</a></th>
        <th><a onClick={e => { e.preventDefault(); onHeaderClick('year') }}>Year</a></th>
        <th><a onClick={e => { e.preventDefault(); onHeaderClick('city') }}>City</a></th>
        <th><a onClick={e => { e.preventDefault(); onHeaderClick('state') }}>State</a></th>
        <th><a onClick={e => { e.preventDefault(); onHeaderClick('date') }}>Posted</a></th>
        <th><a onClick={e => { e.preventDefault(); onHeaderClick('source') }}>Source</a></th>
      </tr>
    </thead>
    <tbody>
      {
        results.map((item, index) => (
          <ResultsRow item={item} key={index} />
        ))
      }
    </tbody>
  </table>
)

export default ResultsTable
