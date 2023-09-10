import { createContext, useEffect, useRef, useState } from 'react';
import './App.css';
import Map from './component/map/map';
import Box from './component/searchBox/box';
import Details from './component/details/details';
const try1 = createContext(null);
async function getIp(ip) {
  let data = (await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_jjU5tDVNz9ORTzgMo0O13k8G1MyI6&ipAddress=${ip || ""}`)).json();
  let data2 = await data;
  return data2;
}
const regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
const escapeRegex = {};
const initializer = {
  "ip": "loading...",
  "location": {
    "country": "loading...",
    "region": "loading...",
    "city": "loading...",
    "lat": 0,
    "lng": 0,
    "postalCode": "loading...",
    "timezone": "loading...",
    "geonameId": 0
  },
  "as": {
    "asn": 0,
    "name": "loading...",
    "route": "loading...",
    "domain": "loading...",
    "type": "loading..."
  },
  "isp": "loading..."
}
function App() {
  const [values, changeValues] = useState(() => { return initializer });
  const input = useRef(null);
  function handelRequest(escape) {
    const ip = input.current.value.trim();
    if (regex.test(ip) || escape === escapeRegex) {
      getIp(ip || "").then(res => {
        changeValues(() => {
          console.log(res);
          if (res.isp) {
            return res;
          }
          else {
            alert(res.messages);
            return initializer;
          }
        });
      });
    }
    else {
      alert("this is not a vaild ip address");
    }
  }
  useEffect(() => {
    handelRequest(escapeRegex);
  }, []);
  return (
    <try1.Provider value={1234}>
      <div className="App">
        <header className="App-header">
          <Box handleClick={handelRequest} ref={input} />
          <Details ip={values.ip} location={values.location.city} timezone={values.location.timezone} isp={values.isp} />
        </header>
        <main>
          <Map centerValue={[values.location.lat, values.location.lng]} data={`${values.location.country}, ${values.location.region}, ${values.location.city} `} />
        </main>
      </div>
    </try1.Provider>
  );
}

export default App;
export { try1 };
