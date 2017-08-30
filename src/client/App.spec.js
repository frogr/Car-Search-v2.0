/* global jest,expect */
'use strict'

import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import SearchForm from './SearchForm'
import ResultsTable from './ResultsTable'

describe('<App />', () => {
  let wrapper
  
  beforeEach(() => {
    wrapper = mount(<App />)
  })
  
  it('renders a <SearchForm />', () => {
    expect(wrapper.containsMatchingElement(
      <SearchForm />
    )).toBeTruthy()
  })
  
  it('renders a <ResultsTable />', () => {
    expect(wrapper.containsMatchingElement(
      <ResultsTable />
    )).toBeTruthy()
  })
  
})
