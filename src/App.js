import { useEffect, useState } from 'react';
import './App.css';
import Card from './component/card/card';
import FilterCard from './component/filterCard/filterCard';
function loading(details) {
  if (details)
    return details;
  else
    return ([{
      id: -1,
      company: "loading",
      logo: "loading",
      new: "loading",
      featured: "loading",
      position: "loading",
      role: "loading",
      level: "loading",
      postedAt: "loading",
      contract: "loading",
      location: "loading",
      languages: ["loading"],
      tools: ["loading"]
    }]);
}
function fetchData(changeData) {
  let url = window.location.href;
  if (window.location.href.includes("jobList"))
    url += "/data.json";
  else
    url += "jobList/data.json";
  //console.log(url);
  fetch(url).then(data => {
    data = data.json();
    return data;
  }).then(data => { changeData(data) });
}
function App() {
  const [width, changeWidth] = useState(() => window.innerWidth)
  const [data, changeData] = useState(() => loading(null));
  const [filter, handleFilter] = useState([]);
  //console.log("app rerendered");
  useEffect(() => {
    window.addEventListener("resize", (e) => {
      changeWidth(window.innerWidth);
      //console.log(window.innerWidth);
    });
    fetchData(changeData);
    return window.removeEventListener("resize", (e) => {
      changeWidth(window.innerWidth);
    });
  }, []);
  function addingFilter(item) {
    //console.log(item);
    handleFilter(el => {
      if (!el.includes(item)) {
        el.push(item);
        el = [...el];
      }
      return el;
    });
    //console.log(filter);
  }
  function handleDel(i) {
    handleFilter(el => {
      let temp = [...el]
      temp.splice(i, 1);
      //console.log(el);
      return temp;
    });
  }
  function clearFilterItem() {
    handleFilter(el => []);
  }
  return (
    <>
      <header className={'header ' + (width > 800 ? "FP" : "FM")}>pc</header>
      <FilterCard filter={filter} handleDel={handleDel} clearFilterItem={clearFilterItem} />
      <div className='container'>
        {data.map((el, i) => {
          let tags = [el.role, el.level, ...el.languages, ...el.tools];
          if (filter.length !== 0) {

            let flag = filter.length;
            for (let g = 0; g < tags.length; g++) {
              debugger;
              for (let e = 0; e < filter.length; e++) {
                if (filter[e] === tags[g]) {
                  flag--;
                }
                if (!flag)
                  return <Card details={data[i]} addingFilter={addingFilter} width={width} key={el.id} tags={tags} />
              }
            }
          }

          if (filter.length === 0)
            return <Card details={data[i]} addingFilter={addingFilter} width={width} key={el.id} tags={tags} />
        })}
      </div>
    </>
  );
}

export default App;
