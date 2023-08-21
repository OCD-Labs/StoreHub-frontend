import { Card, Title, BarChart, Subtitle } from "@tremor/react";

const chartdata = [
  {
    name: "January",
    "Montly amount of sales": 2488,
  },
  {
    name: "February",
    "Montly amount of sales": 1445,
  },
  {
    name: "March",
    "Montly amount of sales": 743,
  },
  {
    name: "April",
    "Montly amount of sales": 903,
  },
  {
    name: "May",
    "Montly amount of sales": 73,
  },
  {
    name: "June",
    "Montly amount of sales": 43,
  },
  {
    name: "July",
    "Montly amount of sales": 74,
  },
  {
    name: "August",
    "Montly amount of sales": 1743,
  },
  {
    name: "September",
    "Montly amount of sales": 143,
  },
  {
    name: "October",
    "Montly amount of sales": 1743,
  },
  {
    name: "November",
    "Montly amount of sales": 365,
  },
  {
    name: "December",
    "Montly amount of sales": 13,
  },
];

const dataFormatter = (number: number) => {
  return "$ " + Intl.NumberFormat("us").format(number).toString();
};
const Chart = () => (
  <Card className="min-w-[700px]">
    <Title>Number of sales for the year represented by months</Title>
    <Subtitle>
      StoreHub provides you wiht a chart to visualise your sales and measure your growth.
    </Subtitle>
    <BarChart
      className="mt-6"
      data={chartdata}
      index="name"
      categories={["Montly amount of sales"]}
      colors={["blue"]}
      valueFormatter={dataFormatter}
      yAxisWidth={48}
    />
  </Card>
);

export default Chart;