class App extends React.Component {

  constructor(props) {
    super(props)
    this.options = {
      type: 'line',
      data: {
        labels: ['spend', 'cpa', 'customer', 'revenue', 'gross profit'],
        datasets: [{
          label:'UK - PPC',
          fill: false,
          lineTension: 0.4,
          pointBorderWidth: 2,
          data: ["10000", "200", "3500", "600", "120"]
        },
        {
          label:'UK - Paid Social',
          fill: false,
          lineTension: 0.4,
          pointBorderWidth: 2,
          data: ["100", "2000", "500", "-1000", "27000"]
        }]
      },
    }

  }


  componentDidMount() {
    this.canvas = document.querySelector('canvas')
    this.ctx = this.canvas.getContext('2d')
    const gradient =                  this.ctx.createLinearGradient(0,10,1000,20);
       gradient.addColorStop(0, '#111');
      gradient.addColorStop(1, '#ff4000');
    this.chart = new Chart(this.ctx, this.options)
  }

  render() {
    return (
      <div>
        <canvas />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('.app')
)
