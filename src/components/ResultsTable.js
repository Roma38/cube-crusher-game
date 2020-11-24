import React from 'react'
import { Table } from 'semantic-ui-react'

function ResultsTable({ results }) {
  return <Table basic='very' celled collapsing className="results-table">
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Score</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {results.sort((a, b) => b.points - a.points)
        .slice(0, 10)
        .map(({ name, points }, index) => <Table.Row key={index}>
        <Table.Cell>{name}</Table.Cell>
        <Table.Cell>{points}</Table.Cell>
      </Table.Row>)}
    </Table.Body>
  </Table>
}

export default ResultsTable