import React, { Component } from 'react'
import PageWrap from './PageWrap';
import Displaychart from '../components/DisplayChart';
import axios from 'axios';


import { Dropdown, Input, Label, Menu, Checkbox, Select, Form } from 'semantic-ui-react';



// import { getOptions } from '../common'
// import { countryOptions } from '../common'

export default class DataVizualiztion extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: 'inbox', active: false, values: [], search: '', countries:'' };
  }


  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  axios.get('http://localhost:3001/api/v1/countries')
  .then((response, prevState) => {
      this.setState((prevState)=>({
        countries: response.data.countries[0]['iso3']
      }))
    })
    .catch(function (error) {
      console.log(error);
    });


  componentDidMount = () => {
    this.init()
  }


  render() {
    console.log(this.state.countries)
    var countryarray = [];
    for(var i=0; i<127; i++) {

    var flagcode = this.state.countries[i].iso3.toLowerCase()
    countryarray.push(
        {
          key: flagcode,
          value: flagcode,
          flag: flagcode,
          text: this.state.countries[i]['country']
        }
      )
    }

    const { activeItem } = this.state
    // const countryOptions = [
    //   {key:"cn",value: 'cn', flag: 'cn', text:'China'},
    //   {key:"us", value: 'us', flag: 'us', text:'USA'},
    //   {key:"af", value: 'af', flag: 'af', text:'Afghanistan'}
    // ];
    const countryOptions = countryarray;
    const yearOptions = [
      {value:'2013', text:'2013'},
      {value:'2014', text:'2014'},
      {value:'2015', text:'2015'},
      {value:'2015', text:'2016'},
      {value:'2015', text:'2017'}
    ]
    const chartOptions = [{value:'barchart', text:'Bar Chart'}, {value:'linechart', text:'Line Chart'}, {value:'histogram', text:'Histogram'}, {value:'radarchart', text:'Radar Chart'}]
    return(
      <PageWrap>

        <Menu id="sidemenu" vertical style={{margin:0, width:250, marginRight:20, marginLeft:20}} >

          <Dropdown item text='Chart Type'>
            <Dropdown.Menu>
              <Dropdown.Item icon='edit' text='First Choice' />
              <Dropdown.Item icon='globe' text='Second Choice' />
              <Dropdown.Item icon='settings' text='Third Choice' />
            </Dropdown.Menu>
          </Dropdown>

          <Menu.Item class="one_selection">
            <h3>Select a chart</h3>
            <Select placeholder='Select a chart' scrolling options={chartOptions} >
            </Select>
          </Menu.Item>


          <Menu.Item class="one_selection">
            <h3>Select a Country:</h3>
            <Select placeholder='Select your country' options={countryOptions}>
              {
                /* (countryOptions) =>
                countryOptions.map(
                  () =>
                  (
          <Checkbox
            radio
            label='Or that'
            name='checkboxRadioGroup'
            value='that'
          />
                  )
                )
              */}
            </Select>
          </Menu.Item>

          <Menu.Item class="one_selection">
            <h3>Select a year</h3>
            <Select placeholder='Select a year' scrolling options={yearOptions} >
            </Select>
          </Menu.Item>


          <Dropdown item text='More'>
            <Dropdown.Menu>
              <Dropdown.Item icon='edit' text='Edit Profile' />
              <Dropdown.Item icon='globe' text='Choose Language' />
              <Dropdown.Item icon='settings' text='Account Settings' />
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown item text='More'>
            <Dropdown.Menu>
              <Dropdown.Item icon='edit' text='Edit Profile' />
              <Dropdown.Item icon='globe' text='Choose Language' />
              <Dropdown.Item icon='settings' text='Account Settings' />
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown item text='More'>
            <Dropdown.Menu>
              <Dropdown.Item icon='edit' text='Edit Profile' />
              <Dropdown.Item icon='globe' text='Choose Language' />
              <Dropdown.Item icon='settings' text='Account Settings' />
            </Dropdown.Menu>
          </Dropdown>

        </Menu>
        <h1>Generated Chart</h1>
        <Displaychart />
      </PageWrap>
    )
  }
}




// import React, { Component } from 'react'
// import { Dropdown, Input, Label, Menu } from 'semantic-ui-react'
// import { Select } from 'semantic-ui-react'
//
// import { getOptions } from '../common'
// import { countryOptions } from '../common'
// // [{ key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' }, ...{}]



// export default class MenuExampleSizeVerticalMini extends Component {
//   state = { activeItem: 'inbox' }
//
//   handleItemClick = (e, { name }) => this.setState({ activeItem: name })
//
//   render() {
//     const { activeItem } = this.state
//
//     return (
//       <Menu vertical>
//         <Menu.Item>
//           <Input placeholder='Search...' />
//         </Menu.Item>
//           <Dropdown item text='Chart Type'>
//             <Dropdown.Menu>
//               <Dropdown.Item icon='edit' text='First Choice' />
//               <Dropdown.Item icon='globe' text='Second Choice' />
//               <Dropdown.Item icon='settings' text='Third Choice' />
//             </Dropdown.Menu>
//           </Dropdown>
//
//         <Menu.Item>
//           Select up to [n] Countries:
//           <Dropdown item text='Select One'>
//             <Dropdown.Menu>
//               <Dropdown.Item icon='edit' text='First Choice' />
//               <Dropdown.Item icon='globe' text='Second Choice' />
//               <Dropdown.Item icon='settings' text='Third Choice' />
//             </Dropdown.Menu>
//           </Dropdown>
//           <Select style="max-width:30px" placeholder='Select your country' options={countryOptions} />
//         </Menu.Item>
//
//         <Menu.Item>
//           Select a year
//           <Dropdown placeholder='Select a year' scrolling options={getOptions(15)} />
//         </Menu.Item>
//
//         <Dropdown item text='More'>
//           <Dropdown.Menu>
//             <Dropdown.Item icon='edit' text='Edit Profile' />
//             <Dropdown.Item icon='globe' text='Choose Language' />
//             <Dropdown.Item icon='settings' text='Account Settings' />
//           </Dropdown.Menu>
//         </Dropdown>
//       </Menu>
//     )
//   }
// }
