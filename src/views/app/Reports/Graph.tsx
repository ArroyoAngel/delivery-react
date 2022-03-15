import { Component, Fragment } from "react";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

class Graph extends Component<any> {
    options = {
        chart: {
            type: 'column'
        },
        title: {
          text: 'My chart'
        },
        series: [{
          data: [{
                y: 1,
                name: 'a'
            },{
                y: 3,
                name: 'b'
            },{
                y: 2,
                name: 'c'
            }
          ,]
        }]
    }
    constructor(props: any){
        super(props)
    }
    render(){
        return <Fragment>
            <HighchartsReact
                highcharts={Highcharts}
                options={this.options}
            />
        </Fragment>
    }
}

export default Graph