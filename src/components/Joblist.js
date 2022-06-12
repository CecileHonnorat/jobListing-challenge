import '../App.css';
import React, { useState, useEffect } from 'react';
import { Tag, Button } from 'antd';
import data from '../data.json';

export default function Joblist(props) {

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [jobList, setJobList] = useState(data);

  // // Display list of jobs
  useEffect(() => {
    filterJobs()
  }, [selectedFilters]);

  // Add unique filters
  let selectFilters = (newFilter) => {
    if (selectedFilters.includes(newFilter)) {
      setSelectedFilters(...selectedFilters)
    } else {
      setSelectedFilters([...new Set(selectedFilters), newFilter])
    }
  }
  console.log(selectedFilters)

  // Remove filter from the filters' list
  let removeFilter = (filter) => {
    let index = selectedFilters.indexOf(filter)
    console.log(index)
    if (index > -1) {
      selectedFilters.splice(index, 1)
    }
    setSelectedFilters([...selectedFilters])
  }

  
  // Show the box with filters
  let filterBox;
  let filters = selectedFilters.map((filter, f) => {
    return (<p className='activeFilter'>{filter}
      <img src='../images/icon-remove.svg' alt='removefilter' className='removeIcon' onClick={() => removeFilter(filter)} />
    </p>)
  })
  if (selectedFilters.length > 0) {
    filterBox = <div className='filterBox'>
      <div className='selectedFilters'>
        {filters}
      </div>
      <p className='clear' onClick={() => (setSelectedFilters([]), setJobList(data))}>Clear</p>
    </div>
  } else {
    filterBox = <></>
  }

    // Find ths jobs that match the filters
    let dataFiltered;
    let match;
    function filterJobs() {
      if (selectedFilters.length > 0) {
        for (let i = 0; i < selectedFilters.length; i++) {
          match = data.filter(element =>
            element.level === selectedFilters[i] ||
            element.role === selectedFilters[i] ||
            element.languages.includes(selectedFilters[i]) ||
            element.tools.includes(selectedFilters[i])
          )
        }
        setJobList(match)
      } else {
        setJobList(data)
      }
    }
  
    console.log(jobList)

  // Show the list of jobs with and without filters
  dataFiltered = jobList.map((item, i) => {
    let featured;
    let newJob;
    let classNameFeatured;
    if (item.featured === true) {
      featured = <Tag color='hsl(180, 14%, 20%)'
        style={{ borderRadius: '25%', height: '1.25rem', margin: '15px' }}>FEATURED</Tag>
        classNameFeatured= "jobListFeatured "
    }else{
      classNameFeatured="jobList"
    }
    if (item.new === true) {
      newJob = <Tag color='hsl(180, 29%, 50%)'
        style={{ borderRadius: '25%', height: '1.25rem', margin: '15px' }}>NEW!</Tag>
    }
    // Get all languages for each job :
    let languages = [];
    for (let j = 0; j < item.languages.length; j++) {
      languages.push(item.languages[j])
    }
    let lang = languages.map((language, l) => {
      return (<Button className='buttonFilter' onClick={() => selectFilters(language)}>{language}</Button>)
    })
    // Get all tools for each job :
    let tools = [];
    for (let k = 0; k < item.tools.length; k++) {
      tools.push(item.tools[k])
    }
    let tool;
    if (tools.length > 0) {
      tool = tools.map((toolname, t) => {
        return (<Button className='buttonFilter' onClick={() => selectFilters(toolname)}>{toolname}</Button>)
      })
    }
    return (
      <div className={classNameFeatured} key={i}>
        <section className='jobInfo'>
          <img src={item.logo} alt='logo' className='logo' />
          <div className='details'>
            <section className='companyInfo'>
              <h1>{item.company}</h1>
              {newJob}
              {featured}
            </section>
            <h2>{item.position}</h2>
            <p className='subtitle'>{item.postedAt}  &#8226;  {item.contract} &#8226; {item.location}</p>
          </div>
        </section>
        <div className='filters'>
          <Button className='buttonFilter' onClick={() => selectFilters(item.role)}>{item.role}</Button>
          <Button className='buttonFilter' onClick={() => selectFilters(item.level)}>{item.level}</Button>
          {lang}
          {tool}
        </div>
      </div>)
  })

  return (
    <>
      {filterBox}
      {dataFiltered}
    </>
  )
}

