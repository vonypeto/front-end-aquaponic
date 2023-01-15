import React, { Component } from "react";
import { Table, Row, Col } from "antd";
import { BsSquareFill } from 'react-icons/bs';
//TEMPORARY DYNAMIC DATASET 
let arrival;
let burst;
let priority;
let length;
let processID = [];
let waitingTime = [];
let turnAroundTime = [];
let finishTime = [];
// eslint-disable-next-line
let colortag = [
  "#0085c3",
  "#7ab800",
  "#f2af00",
  "#dc5034",
  "#ce1126",
  "#0085c3",
  "#7FFF00",
  "#00FFFF",
  "#FF1493",
  "#FFFAF0",
];
let letGanttChart = [];
let sum1 = 0,
  sum2 = 0,
  averagetat,
  averagewt;
let tmpsum1, tmpsum2;
let test=-1;

let numbers = [];
// eslint-disable-next-line
const listItems = numbers.map((number) =>
  <li>{number}</li>
);


class PriorityEmpty extends Component {
  //PASS DATA FROM PARENT COMPONENT TO CHILD COMPONENT
  constructor(props) {
    super(props);
    this.state = {
      arrivalText: this.props.arrivalData.join(" "),
      priorityText: this.props.priorityData.join(" "),
      burstText: this.props.burstData.join(" "),
      onceFire: this.props.onceData,
      waiting: [],
      dataProcess: [],
      length: [],
      dataSource: [],
      ganttChart: [],
      columns: [
        {
          title: () => <div className="text-center">Job</div>,
          key: "job",
          render: (_, cpu) => <div className="text-center">{cpu.job}</div>,
        },
        {
          title: () => <div className="text-center">Arrival Time</div>,
          key: "arrival",
          render: (_, cpu) => <div className="text-center">{cpu.arrival}</div>,
        },
        {
          title: () => <div className="text-center">Burst Time</div>,
          key: "burst",
          render: (_, cpu) => <div className="text-center">{cpu.burst}</div>,
        },
        {
          title: () => <div className="text-center">Finished Time</div>,
          key: "ct",
          render: (_, cpu) => <div className="text-center">{cpu.ct}</div>,
        },
        {
          title: () => <div className="text-center">Turnaround Time</div>,
          key: "tat",
          render: (_, cpu) => <div className="text-center">{cpu.tat}</div>,
        },
        {
          title: () => <div className="text-center">Waiting Time</div>,
          key: "wt",
          render: (_, cpu) => <div className="text-center">{cpu.wt}</div>,
        },
      ],
    };
  }
  
  calculateProcessId = (l) => {
    let pid = 0;
    // TURN LENGTH OF PROCESS TO ARRAY
    for (var i = 0; i < l; i++) {
      processID.push([(pid += 1)]);
    }
  };

  calculateWaitingTimeAndGanttChart = (at, bt, pid) => {
    let n = true;
    let count, empty, blank = 0 , blankstart = 0;

    // ANY FIRST PROCESS FROM THE STACK
    finishTime[0] = at[0] + bt[0];
    turnAroundTime[0] = finishTime[0] - at[0];
    waitingTime[0] = turnAroundTime[0] - bt[0];
    count = finishTime[0];
    // PUSH TO GANTTCHART
    letGanttChart.push({
      value: bt[0],
      color: colortag[0 % 10],
      description: "\nStart: " + at[0] +"\n"+
                    "Duration: " + bt[0] + "\n"+
                    "End: "+ count,
      name: "P" + processID[0]
    });
    // LOOP  PROCESS STARTING FROM THE SECOND STACK TO LAST
    for (var i = 1; i < length; i++) {
      
      // NUMBER OF BURST AND INTERVAL OF ARRIVAL TIME
      empty = bt[i];
      blankstart = count;
      while (n) {
        count += 1;
        blank += 1;
        // PUSH BLANK TIME TO GANTTCHART
        // eslint-disable-next-line
        if (at[i] == count) {
          letGanttChart.push({
            value: blank,
            color: "gray",
            name: "-",
            description: "\nStart: " + blankstart+"\n"+
                         "Duration: " + blank + "\n"+
                         "End: "+ count,

          });
       
        }
        //ARRIVAL TIME DISTANCE FROM THE OTHER PROCESS
        if (at[i] < count) {
          empty -= 1;
          
          //PROCESS END PUSH TO GANTCHART
          // eslint-disable-next-line
          if (empty == 0) {
            n = false;
            blank = 0;
            finishTime[i] = count;
            turnAroundTime[i] = Math.abs(finishTime[i] - at[i]); 
            waitingTime[i] = Math.abs(turnAroundTime[i] - bt[i]); 
            letGanttChart.push({
              value: bt[i],
              color: colortag[i % 10],
              description: "\nStart: " + at[i] +"\n"+
                           "Duration: " + bt[i] + "\n"+
                           "End: "+ count,
              name: "P" + processID[i]
            });
          }
        }
      }
      n = true;
    }
    //RESET
    count = 0;
    empty = 0;
    // eslint-disable-next-line
    for (var i = 0; i < length; i++) {
      sum1 += turnAroundTime[i];
      sum2 += waitingTime[i];
    }
    // TRANFER DATA TO RENDER
    tmpsum1 = sum1;
    tmpsum2 = sum2;
    averagetat = Math.round((sum1 / length + Number.EPSILON) * 100) / 100;
    averagewt = Math.round((sum2 / length + Number.EPSILON) * 100) / 100;
  };




  
  sortAccordingArrivalTimeAndPriority = (at, bt, prt, pid) => {
    let temp;
    let stemp;
    for (var i = 0; i < length; i++) {
      for (var j = 0; j < length - i - 1; j++) {
        if (at[j] > at[j + 1]) {
          //SWAPPING ARRIVAL TIME
          temp = at[j];
          at[j] = at[j + 1];
          at[j + 1] = temp;

          //SWAPPING BURST TIME
          temp = bt[j];
          bt[j] = bt[j + 1];
          bt[j + 1] = temp;

          //SWAPPING PRIORITY
          temp = prt[j];
          prt[j] = prt[j + 1];
          prt[j + 1] = temp;

         //SWAPPING PROCESS ID
          stemp = pid[j];
          pid[j] = pid[j + 1];
          pid[j + 1] = stemp;
        }
        //SORITING ACCORDING TO PRIORITY WHEN ARRIVAL TIME ARE THE SAME
        if (at[j] === at[j + 1]) {
          if (prt[j] > prt[j + 1]) {
            //SWAPPING ARRIVAL TIME
            temp = at[j];
            at[j] = at[j + 1];
            at[j + 1] = temp;

            //SWAPPING BURST TIME
            temp = bt[j];
            bt[j] = bt[j + 1];
            bt[j + 1] = temp;

            //SWAPPING PRIORITY
            temp = prt[j];
            prt[j] = prt[j + 1];
            prt[j + 1] = temp;

            //SWAPPING PROCESS ID
            stemp = pid[j];
            pid[j] = pid[j + 1];
            pid[j + 1] = stemp;
          }
        }
      }
    }
    return (
      arrival = at,
      burst = bt,
      priority = prt
    )
  
  };

  tableDataOutputProcess = (at, bt, prt, ct, tat, wt, l, pid) => {

    let n = 0;
    //PUSH DATA FROM THE TABLE
    for (var i = 0; i < l; i++) {
      this.state.dataSource.push({
        key: (n += 1),
        job: "P" + pid[i],
        arrival: at[i],
        burst: bt[i],
        priority: prt[i],
        ct: ct[i],
        tat: tat[i],
        wt: wt[i],
      });
    }
    numbers = pid;
    test = -1;
    // CLEAR DATASET
    letGanttChart = [];
    processID = [];
    waitingTime = [];
    turnAroundTime = [];
    finishTime = [];
    arrival = [];
    burst = [];
    priority = [];
    finishTime = [];
    turnAroundTime = [];
    waitingTime = [];
    sum1 = 0;
    sum2 = 0;
    return null
  };

  renderComputedPriority(){
    //INITIALIZING
      arrival = this.state.arrivalText.split(" ").map(Number);
      burst = this.state.burstText.split(" ").map(Number);
      priority = this.state.priorityText.split(" ").map(Number);
      length = this.state.arrivalText.split(" ").length;
      //METHODS COMPUTATION
      this.calculateProcessId(length);
      this.sortAccordingArrivalTimeAndPriority(
        arrival,
        burst,
        priority,
        processID
      );
      this.calculateWaitingTimeAndGanttChart(arrival, burst, processID);
      this.tableDataOutputProcess(
        arrival,
        burst,
        priority,
        finishTime,
        turnAroundTime,
        waitingTime,
        length,
        processID
      );
  console.log("RENDER")
   
  }
  
  // RENDER THE DATA TO GANTTCHART AFTER RENDERING TABLE
  componentDidMount() {
    this.props.updateGanttChart.selectGanttChart(letGanttChart);
  }

  render() {
    //RENDER
  this.renderComputedPriority()
    return (
      <>
               <Row align="middle" justify="center">
            {numbers.map((processID) =>
              <Col style={{ margin: "0px 8px" }}>
                P{processID} <BsSquareFill style={{ color: colortag[(test+=1) % 10], margin: "-2px 0px" }} />
        
               
              </Col>
            )}
            <Col style={{ margin: "0px 8px" }}>
              Idle CPU <BsSquareFill style={{ color: "grey", margin: "-2px 0px" }} />
            </Col>
          </Row>
        <div>
          <Table
            dataSource={this.state.dataSource}
            className="text-center"
            columns={this.state.columns}
            pagination={false}
            rowKey="key"
            scroll={{ x: "max-content" }}
          />
        </div>
        <div>
          <Row>
            <Col xs={12} sm={12} md={12} xl={12} className="text-left">
              <label>
                Average Turn Around Time: {tmpsum1} / {length} = {averagetat}
              </label>
            </Col>
            <Col xs={12} sm={12} md={12} xl={12} className="text-right">
              <label>
                Average Waiting Time: {tmpsum2} / {length} = {averagewt}
              </label>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default PriorityEmpty;