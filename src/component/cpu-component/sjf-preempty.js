import React, { Component } from "react";
import { Table, Row, Col } from "antd";
import { BsSquareFill } from 'react-icons/bs';

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

let arrivalTime = [];
let burstTime = [];
let originalBurstTime = [];
let totalLength;
let processID = [];
let waitingTime = [];
let turnAroundTime = [];
let finishTime = [];
let letGanttChart = [];
let sumtat = 0, sumwt = 0, averagetat, averagewt;

let tempPID = [];


class SJFPreempty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrivalText: this.props.arrivalData.join(" "),
      burstText: this.props.burstData.join(" "),
      waiting: [],
      dataProcess: [],
      length: [],
      dataSource: [],
      ganttChart: [],

      columns: [
        {
          title: () => <div className="text-center">Process</div>,
          key: "pid",
          render: (_, cpu) => <div className="text-center">{cpu.pid}</div>,
        },
        {
          title: () => <div className="text-center">Arrival Time</div>,
          key: "at",
          render: (_, cpu) => <div className="text-center">{cpu.at}</div>,
        },
        {
          title: () => <div className="text-center">Burst Time</div>,
          key: "bt",
          render: (_, cpu) => <div className="text-center">{cpu.bt}</div>,
        },
        {
          title: () => <div className="text-center">Finished Time</div>,
          key: "ft",
          render: (_, cpu) => <div className="text-center">{cpu.ft}</div>,
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
    for (var i = 0; i < l; i++) {
      processID.push([(pid += 1)]);
    }
  };

  pushData = () => {
    for (var i = 0; i < totalLength; i++) {
      this.state.dataSource.push({
        key: i + 1,
        pid: "P" + (processID[i]),
        at: arrivalTime[i],
        bt: originalBurstTime[i],
        ft: finishTime[i],
        tat: turnAroundTime[i],
        wt: waitingTime[i],
      });
    }

    tempPID = processID;

    //Clear Data
    letGanttChart = []
    processID = []
    waitingTime = []
    turnAroundTime = []
    finishTime = []
    arrivalTime = []
    originalBurstTime = []
    burstTime = []
    finishTime = []
    turnAroundTime = []
    waitingTime = []
  }

  pushGanttChart = (prevPID, runtime, prevRuntime) => {
    console.log("Runtime: ? PrevRuntime: ?", runtime, prevRuntime)
    let duration = runtime - prevRuntime;

    //prevPID is undefined if there is no process loaded
    if (prevPID !== undefined && prevPID >= -1 && prevPID !== null) {
      console.log("Pushing gantt chart, PID: " + prevPID)
      letGanttChart.push({
        value: duration,
        color: colortag[(prevPID) % 10],
        name: "P" + processID[prevPID],
        description: 
          "\nStart: " + prevRuntime + "\n" +
          "Duration: " + duration + "\n" +
          "End: " + runtime,

      })
    }
    else {
      letGanttChart.push({
        value: runtime,
        color: "grey",
        name: "-",
        description: 
          "\nStart: " + prevRuntime + "\n" +
          "Duration: " + duration + "\n" +
          "End: " + runtime,
      })
    }

  }

  calculateTime = (SPID, runtime) => {
    // FinishTime
    finishTime[SPID] = runtime;

    //TurnAroundTime
    turnAroundTime[SPID] = finishTime[SPID] - arrivalTime[SPID];

    //WaitingTime
    waitingTime[SPID] = turnAroundTime[SPID] - originalBurstTime[SPID];
  }

  calculateAverage = () => {
    //Emptying Variables
    sumwt = 0;
    sumtat = 0;

    processID.forEach(PID => {
      // PID is decremented by 1 since array start counting from 1
      PID--;

      //SumWaitingTime
      sumwt += waitingTime[PID];

      //SumTurnAroundTime
      sumtat += turnAroundTime[PID];
    });

    //Average of waiting and turnaround time
    averagetat = Math.round(((sumtat / totalLength) + Number.EPSILON) * 100) / 100;
    averagewt = Math.round(((sumwt / totalLength) + Number.EPSILON) * 100) / 100;
  }

  startSJF = () => {
    //Initialize
    arrivalTime = this.state.arrivalText.split(" ").map(Number);
    originalBurstTime = this.state.burstText.split(" ").map(Number);
    burstTime = this.state.burstText.split(" ").map(Number);
    totalLength = this.state.arrivalText.split(" ").length;

    let SPID, done = false, counter = 0, runtime = 0, prevPID, prevRuntime = 0;

    this.calculateProcessId(totalLength);

    while (!done) {
      //Finding the shortest burst time
      for (let i = 0; i < totalLength; i++) {
        console.log("For loop:" + i + " BurstTime: " + burstTime[i]);
        if (arrivalTime[i] <= runtime && burstTime[i] > 0) {
          if (SPID != null) {
            if (burstTime[i] < burstTime[SPID]) {
              console.log("Old SPID is: " + SPID + " New SPID is: " + i + " Previous SPID: " + processID[SPID]);
              SPID = i;
            }
          }
          else {
            console.log("SPID is null, SPID: " + i);
            SPID = i;
          }
        }

      }

      //For Filling Up Gantt Chart
      if (runtime > 0) {
        if (prevPID !== SPID) {
          this.pushGanttChart(prevPID, runtime, prevRuntime);
          prevRuntime = runtime;
        }
      }

      //Compute runtime
      console.log("end of for loop, SPID: " + SPID);
      runtime++;
      burstTime[SPID]--;
      prevPID = SPID; //Checking if process is change

      console.log("PID: " + SPID + " Burst time: " + burstTime[SPID] + " Runtime: " + runtime);

      //After a process is done
      if (burstTime[SPID] === 0) {
        //For Calculating waiting time, turnaround time, finish time,
        this.calculateTime(SPID, runtime,);

        SPID = null;
        counter++; //counter for ending the loop
        console.log("SPID is zero, turning it to null");
      }

      // Termination of loop
      if (counter >= totalLength) {
        //Adding of the last process to gantt chart
        prevRuntime = this.pushGanttChart(prevPID, runtime, prevRuntime);
        prevRuntime = runtime;

        //ave waiting time, ave turnaround time
        this.calculateAverage();

        console.log(letGanttChart);
        done = true; //Ending the loop
      }

    }

    this.pushData();
  }

  componentDidMount() { this.props.updateGanttChart.selectGanttChart(letGanttChart) }

  render() {

    this.startSJF();

    return (
      <>
        <div >

          <Row align="middle" justify="center">
            {tempPID.map((PID) =>
              <Col style={{ margin: "0px 8px" }}>
                P{PID} <BsSquareFill style={{ color: colortag[(PID - 1) % 9], margin: "-2px 0px" }} />
              </Col>
            )}

            <Col style={{ margin: "0px 8px" }}>
              Idle CPU <BsSquareFill style={{ color: "grey", margin: "-2px 0px" }} />
            </Col>
          </Row>

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
              <label>Average Turn Around Time: {sumtat} / {totalLength} = {averagetat}</label>
            </Col >
            <Col xs={12} sm={12} md={12} xl={12} className="text-right">
              <label>Average Waiting Time: {sumwt} / {totalLength} = {averagewt}</label>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default SJFPreempty;