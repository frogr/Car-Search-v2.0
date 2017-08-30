import React from 'react'

const ResultsRow = ({item}) => (
  <tr>
    <td><a href={item.url} target="_blank">{item.title}</a></td>
    <td>${item.price}</td>
    <td>{item.year}</td>
    <td>{item.city}</td>
    <td>{item.state}</td>
    <td>{item.date}</td>
    <td>{item.source}</td>
  </tr>
)

export default ResultsRow
