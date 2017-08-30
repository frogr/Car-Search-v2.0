/* global fetch */
import React, { Component } from 'react'
import classNames from 'classnames'
import SearchForm from './SearchForm'
import ResultsTable from './ResultsTable'
require('isomorphic-fetch')

class App extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      alertClass: 'alert-info',
      alertText: '',
      zip: '',
      distance: '15',
      keywords: '',
      results: [],
      sortKey: 'title',
      sortDirection: 1
    }
    
    this.onZipChange = this.onZipChange.bind(this)
    this.onDistanceChange = this.onDistanceChange.bind(this)
    this.onKeywordsChange = this.onKeywordsChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onHeaderClick = this.onHeaderClick.bind(this)
  }

  componentDidMount() {
    this.doSearch(
      '95811', //sacramento, ca
      '15',
      'mustang'
    )
  }
  
  onZipChange(e) {
    this.setState({zip: e.target.value})
  }
  
  onDistanceChange(e) {
    this.setState({distance: e.target.value})
  }
  
  onKeywordsChange(e) {
    this.setState({keywords: e.target.value})
  }
  
  onSubmit() {
    this.doSearch(
      this.state.zip,
      this.state.distance,
      this.state.keywords
    )
  }

  onHeaderClick(key) {
    // sort ascending by default
    let sortDirection = 1
    
    // if same key as current sort
    // use opposite sort direction as current
    if(key === this.state.sortKey) {
      sortDirection = this.state.sortDirection * -1
    }

    this.setState({
      results: this.sort(
        this.state.results,
        key, 
        sortDirection
      ),
      sortKey: key,
      sortDirection
    })
  }
  
  doSearch(zip, distance, keywords) {
    this.setState({
      alertClass: 'alert-info',
      alertText: 'Searching...',
      results: []
    })
    
    let url = '/api/search?'
    url += 'zip=' + encodeURI(zip)
    url += '&distance=' + encodeURI(distance)
    url += '&keywords=' + encodeURI(keywords)

    fetch(url)
      .then(res => res.json())
      .then(res => {
        if(res.error) {
          this.setState({
            alertClass: 'alert-warning',
            alertText: res.error
          })
        } else {
          this.setState({
            alertText: '',
            results: this.sort(
              res.data,
              this.state.sortKey,
              this.state.sortDirection
            )
          })
        }
      })
  }
  
  sort(data, key, direction) {

    const sorted = data.sort((a, b) => {
      let ret
      
      let aVal = a[key]
      let bVal = b[key]
      
      if(key == 'price' || key == 'year') {
        aVal = isNaN( parseInt(a[key]) ) ? 0 : parseInt(a[key])
        bVal = isNaN( parseInt(b[key]) ) ? 0 : parseInt(b[key])
      }
      
      if(aVal < bVal) {
        ret = -1
      } else if(aVal === bVal) {
        ret = 0
      } else {
        ret = 1
      }

      return ret * direction
    })
    
    return sorted
  }
  
  render() {
    return (
      <div className="container-fluid">
        <div className="panel panel-primary">

          <div className="panel-heading">
            <h3
              className="text-center"
              style={{marginTop:'0', marginBottom:'0'}}
            >Car Searching</h3>
          </div>

          <div className="panel-body text-center">
            { this.state.alertText
                ? <div
                    className={classNames(this.state.alertClass, 'alert', 'center-block')}
                    role="alert"
                    style={{width:'50%'}}
                  >
                    <h4 style={{marginBottom:'0'}}>{this.state.alertText}</h4>
                  </div>
                : null
            }
            <SearchForm
              zip={this.state.zip}
              distance={this.state.distance}
              keywords={this.state.keywords}
              onZipChange={this.onZipChange}
              onDistanceChange={this.onDistanceChange}
              onKeywordsChange={this.onKeywordsChange}
              onSubmit={this.onSubmit}
            />
          </div>

          <ResultsTable
            results={this.state.results}
            onHeaderClick={this.onHeaderClick}
          />
        </div>
      </div>
    )
  }
}

export default App
