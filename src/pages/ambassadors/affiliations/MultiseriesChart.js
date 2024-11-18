import React, { Component } from 'react';
import { CanvasJSChart } from 'canvasjs-react-charts';
import Typography from '@material-ui/core/Typography';

class MultiseriesChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedYear: 2024,
      selectedWeek: null,
      weekData: this.getWeekDates(this.getCurrentWeekMonday()),
    };
  }

  generateWeeksForYear(year) {
    const weeks = [];
    for (let i = 1; i <= 52; i++) {
      const date = new Date(year, 0, i * 7);
      const formattedDate = `Week ${i} (${this.formatDate(this.getCurrentWeekMonday(date))})`;
      weeks.push({ value: i, label: formattedDate });
    }
    return weeks;
  }

  getCurrentWeekMonday(date = new Date()) {
    const dayOfWeek = date.getDay();
    const monday = new Date(date);
    monday.setDate(date.getDate() - ((dayOfWeek + 6) % 7));
    return monday;
  }

  getWeekDates(monday) {
    const previousWeek = new Date(monday);
    previousWeek.setDate(monday.getDate() - 7);

    const nextWeek = new Date(monday);
    nextWeek.setDate(monday.getDate() + 7);

    return [
      { date: this.formatDate(previousWeek), clicks: 120, sales: 40, label: "Before" },
      { date: this.formatDate(monday), clicks: 150, sales: 50, label: "Current Week", highlighted: true },
      { date: this.formatDate(nextWeek), clicks: 130, sales: 45, label: "After" }
    ];
  }

  formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  handleYearChange = (event) => {
    const selectedYear = parseInt(event.target.value);
    this.setState({ selectedYear, selectedWeek: null });
  }

  handleWeekChange = (event) => {
    const selectedWeek = parseInt(event.target.value);
    const selectedDate = new Date(this.state.selectedYear, 0, (selectedWeek - 1) * 7 + 1);
    const mondayOfSelectedWeek = this.getCurrentWeekMonday(selectedDate);
    this.setState({ 
      selectedWeek,
      weekData: this.getWeekDates(mondayOfSelectedWeek).map((week, index) => ({
        ...week,
        label: index === 1 ? "Week Report" : index === 0 ? "Before" : "After",
        highlighted: index === 1
      }))
    });
  }

  render() {
    const { selectedYear, selectedWeek, weekData } = this.state;
    const years = [2024, 2025, 2026];
    const weeks = this.generateWeeksForYear(selectedYear);

    console.log("Week Data: ", weekData);
    console.log("Weeks: ", weeks);

    const options = {
      animationEnabled: true,
      title: {
        text: "Clicks and Sales per Week"
      },
      axisX: {
        title: "Week",
        labelFormatter: (e) => e.label
      },
      axisY: {
        title: "Count",
        includeZero: false
      },
      toolTip: {
        shared: true
      },
      data: [
        {
          type: "spline",
          name: "Clicks",
          showInLegend: true,
          dataPoints: weekData.map(point => ({
            y: point.clicks,
            label: point.date,
            indexLabel: point.label,
            markerColor: point.highlighted ? "red" : "blue"
          }))
        },
        {
          type: "spline",
          name: "Sales",
          showInLegend: true,
          dataPoints: weekData.map(point => ({
            y: point.sales,
            label: point.date,
            indexLabel: point.label,
            markerColor: point.highlighted ? "green" : "orange"
          }))
        }
      ]
    };


    
    return (
      <div>
        <h1>Weekly Clicks and Sales</h1>
        <Typography variant="h4" gutterBottom>
          Affiliate Links for {selectedYear}
        </Typography>
        <div>
          <label>
            Select Year:
            <select value={selectedYear} onChange={this.handleYearChange}>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </label>

          <label>
            Select Week:
            <select
              value={selectedWeek || ""}
              onChange={this.handleWeekChange}
              disabled={!selectedYear}
            >
              <option value="" disabled>Select a Week</option>
              {weeks.map(week => (
                <option key={week.value} value={week.value}>
                  {week.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* CanvasJSChart component */}
        {weekData.length > 0 ? (
          <CanvasJSChart options={options} />
        ) : (
          <p>No data available for this selection.</p>
        )}
      </div>
    );
  }
}

export default MultiseriesChart;
