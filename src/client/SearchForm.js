import React from 'react'

const SearchForm = ({
  zip,
  distance,
  keywords,
  onZipChange,
  onDistanceChange,
  onKeywordsChange,
  onSubmit
}) => (
  <form
    className="form-inline"
    onSubmit={e => {
      e.preventDefault()
      onSubmit()
    }}>
    <div className="form-group" style={{marginRight:'5px'}}>
      <label className="sr-only" htmlFor="zip">Zip Code</label>
      <input
        type="text"
        value={zip}
        onChange={onZipChange}
        autoFocus
        className="form-control"
        id="zip"
        name="zip"
        placeholder="Zip Code"
        required
      />
    </div>
    <div className="form-group" style={{marginRight:'5px'}}>
      <label className="sr-only" htmlFor="distance">Distance</label>
      <select
        value={distance}
        onChange={onDistanceChange}
        id="distance"
        name="distance"
        className="form-control"
      >
        <option>15</option>
        <option>50</option>
        <option>100</option>
        <option>500</option>
        <option>1000</option>
        <option>5000</option>
      </select>
    </div>
    <div className="form-group" style={{marginRight:'5px'}}>
      <label className="sr-only" htmlFor="keywords">Keywords</label>
      <input
        type="text"
        value={keywords}
        onChange={onKeywordsChange}
        className="form-control"
        id="keywords"
        name="keywords"
        placeholder="Keywords"
        required
        style={{width:'300px'}}
      />
    </div>
    <button type="submit" className="btn btn-primary">Search</button>
  </form>
)

export default SearchForm
