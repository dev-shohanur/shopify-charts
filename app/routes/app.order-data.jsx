import React, { useEffect } from "react";
import prisma from "../db.server";
import { useLoaderData } from "@remix-run/react";
import "../styles/style.css";
import { authenticate } from "../shopify.server";

export async function loader({ request }) {
  const { admin } = await authenticate.admin(request);

  const lineChartOne = await prisma.LineChartsOne.findMany({
    where: { shop: admin?.rest?.session?.shop },
    select: {
      id: true,
      month: true,
      value: true,
    },
  });
  const lineChartTwoData = await prisma.LineChartsTwo.findMany({
    where: { shop: admin?.rest?.session?.shop },
    select: {
      id: true,
      month: true,
      actual: true,
      expected: true,
    },
  });
  const lineChartThere = await prisma.LineChartsThree.findMany({
    where: { shop: admin?.rest?.session?.shop },
    select: {
      id: true,
      time: true,
      value: true,
    },
  });

  console.log({ lineChartThere });

  const lineChartThereData = lineChartThere.sort(function (a, b) {
    return parseInt(a.id) - parseInt(b.id);
  });

  const lineChartFourData = await prisma.LineChartsFour.findMany({
    where: { shop: admin?.rest?.session?.shop },
    select: {
      month: true,
      actual: true,
      expected: true,
    },
  });

  // const barChartOne = await prisma.BarChartOne.findMany({
  //   where: { shop: admin?.rest?.session?.shop },
  //   select: {
  //     month: true,
  //     value: true,
  //   },
  // });
  // const barChartTwoData = await prisma.BarChartTwo.findMany({
  //   where: { shop: admin?.rest?.session?.shop },
  //   select: {
  //     month: true,
  //     actual: true,
  //     expected: true,
  //   },
  // });

  const doughnutPieChartOne = await prisma.DoughnutPieChartOne.findMany({
    where: { shop: admin?.rest?.session?.shop },
    select: {
      label: true,
      value: true,
    },
  });
  const doughnutPieChartTwo = await prisma.DoughnutPieChartTwo.findMany({
    where: { shop: admin?.rest?.session?.shop },
    select: {
      label: true,
      value: true,
    },
  });
  const doughnutPieChartThere = await prisma.DoughnutPieChartThere.findMany({
    where: { shop: admin?.rest?.session?.shop },
    select: {
      label: true,
      value: true,
      backgroundColor: true,
    },
  });
  const doughnutPieChartFourData = await prisma.DoughnutPieChartFour.findMany({
    where: { shop: admin?.rest?.session?.shop },
    select: {
      label: true,
      value1: true,
      value2: true,
      value3: true,
      backgroundColor: true,
    },
  });

  return {
    lineChartOne,
    lineChartTwoData,
    lineChartThereData,
    lineChartFourData,
    // barChartOne,
    // barChartTwoData,
    doughnutPieChartOne,
    doughnutPieChartTwo,
    doughnutPieChartThere,
    doughnutPieChartFourData,
  };
}

const OrderData = () => {
  const loaderData = useLoaderData();

  const lineChartTwo = { actual: [], expected: [], label: [] };

  loaderData?.lineChartTwoData?.map((item) => {
    lineChartTwo.actual.push(item.actual);
    lineChartTwo.expected.push(item.expected);
    lineChartTwo.label.push(item.month);
    return;
  });
  const doughnutPieChartFour = {
    background: [],
    value1: [],
    value2: [],
    value3: [],
    label: [],
  };

  loaderData?.doughnutPieChartFourData?.map((item) => {
    doughnutPieChartFour.background.push(item.backgroundColor);
    doughnutPieChartFour.value1.push(item.value1);
    doughnutPieChartFour.value2.push(item.value2);
    doughnutPieChartFour.value3.push(item.value3);
    doughnutPieChartFour.label.push(item.label);
    return;
  });
  const doughnutPieChartOne = {
    value: [],
    label: [],
  };

  loaderData?.doughnutPieChartOne?.map((item) => {
    doughnutPieChartOne.value.push(item.value);
    doughnutPieChartOne.label.push(item.label);
    return;
  });
  const doughnutPieChartThere = {
    value: [],
    label: [],
    backgroundColor: [],
  };

  loaderData?.doughnutPieChartThere?.map((item) => {
    doughnutPieChartThere.value.push(item.value);
    doughnutPieChartThere.label.push(item.label);
    doughnutPieChartThere.backgroundColor.push(item.backgroundColor);
    return;
  });

  const lineChartThere = { total: 0, historicalData: [] };

  loaderData?.lineChartThereData?.map((item) => {
    lineChartThere.total = lineChartThere.total + Number(item.value);
    lineChartThere.historicalData.push({
      time: {
        month: parseInt(item.time.split(":")[1]),
        year: parseInt(item.time.split(":")[2]),
      },
      value: parseFloat(item.value),
    });
    return;
  });

  // const barChartTwo = { actual: [], expected: [], label: [] };

  // loaderData?.barChartTwoData?.map((item) => {
  //   barChartTwo.actual.push(item.actual);
  //   barChartTwo.expected.push(item.expected);
  //   barChartTwo.label.push(item.month);
  //   return;
  // });

  useEffect(() => {
    let widgetContainer = document.getElementById("widgetContainer");

    widgetContainer.jsonInput = {
      request: [
        {
          url: "https://run.mocky.io/v3/db830bac-3ac3-4d97-ba85-aa13aacf5be5",
          method: "GET",
        },
      ],
      rows: [
        {
          classes: ["justify-content-center"],
          widgets: [
            {
              widget: "line-chart",
              classes: ["col-md-6", "col-lg-3"],
              title: "Trend in Sales",
              subtitle: "in current year",
              url: "www.google.com",
              info: "<strong>Sale Trend</strong>  in current year",
              datasets: [
                {
                  data: loaderData.lineChartOne,
                  parsing: {
                    xAxisKey: "month",
                    yAxisKey: "value",
                  },
                  label: "Actual Order (in M)",
                },
              ],
              chartOptions: {
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: "Month",
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: "Order in a Month",
                    },
                    beginAtZero: false,
                  },
                },
                plugins: {
                  datalabels: {
                    display: true,
                  },
                  title: {
                    display: true,
                    text: "Sale Trend",
                  },
                  tooltip: {
                    callbacks: {
                      label: {
                        arguments: "tooltipItem",
                        body: "return tooltipItem.dataset.label + ': ' + tooltipItem.formattedValue;",
                      },
                    },
                  },
                },
              },
              chartStyle: {
                "height.px": 300,
              },
            },
            {
              widget: "line-chart",
              classes: ["col-md-6", "col-lg-3"],
              title: "Trend in Sales",
              subtitle: "in current year",
              url: "www.google.com",
              info: "<strong>Sale Trend</strong>  in current year",
              datasets: [
                {
                  data: lineChartTwo.actual,
                  label: "Actual Sales (in M)",
                },
                {
                  data: lineChartTwo.expected,
                  label: "Expected Sales (in M)",
                },
              ],
              labels: lineChartTwo.label,
              chartOptions: {
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: "Month",
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: "Sales (in M)",
                    },
                    beginAtZero: false,
                  },
                },
                plugins: {
                  datalabels: {
                    display: "auto",
                  },
                },
              },
              chartStyle: {
                "height.px": 300,
              },
            },
            {
              widget: "line-chart",
              classes: ["col-md-6", "col-lg-3"],
              title: "User Count",
              subtitle: "in last year",
              url: "www.google.com",
              info: "<strong>Active User Count</strong>  in last year",
              hideLegend: true,
              datasets: [
                {
                  data: lineChartThere.historicalData
                    .sort((a, b) => {
                      return (
                        new Date(a.time.year, a.time.month - 1) -
                        new Date(b.time.year, b.time.month - 1)
                      );
                    })
                    .map((d) => d.value),
                  label: "User Count (in M)",
                },
              ],
              labels: lineChartThere.historicalData
                .sort((a, b) => {
                  return (
                    new Date(a.time.year, a.time.month - 1) -
                    new Date(b.time.year, b.time.month - 1)
                  );
                })
                .map((d) => new Date(d.time.year, d.time.month - 1)),
              chartOptions: {
                scales: {
                  x: {
                    type: "time",
                    time: {
                      unit: "month",
                      tooltipFormat: "MMMM y",
                    },
                  },
                },
              },
            },
            {
              widget: "line-chart",
              classes: ["col-md-6", "col-lg-3"],
              title: "Trend in Sales",
              subtitle: "in current year",
              url: "www.google.com",
              info: "<strong>Sale Trend</strong>  in current year",
              dataPresent: loaderData.lineChartFourData.length,
              datasets: [
                {
                  data: loaderData.lineChartFourData.map((d) =>
                    parseFloat(d.actual),
                  ),
                  label: "Actual Sales (in M)",
                },
                {
                  data: loaderData.lineChartFourData.map((d) =>
                    parseFloat(d.expected),
                  ),
                  label: "Expected Sales (in M)",
                },
              ],
              labels: loaderData.lineChartFourData.map((d) => d.month),
              chartOptions: {
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: "Month",
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: "Sales (in M)",
                    },
                    beginAtZero: false,
                  },
                },
                plugins: {
                  datalabels: {
                    display: "auto",
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
              chartStyle: {
                "height.px": 300,
              },
            },
          ],
        },
        {
          classes: ["justify-content-center"],
          widgets: [
            {
              widget: "bar-chart",
              classes: ["col-md-6", "col-lg-3"],
              title: "Trend in Sales",
              subtitle: "in current year",
              hideLegend: true,
              url: "www.google.com",
              info: "<strong>Sale Trend</strong>  in current year",
              datasets: [
                {
                  data: loaderData.lineChartOne,
                  parsing: {
                    xAxisKey: "month",
                    yAxisKey: "value",
                  },
                  label: "Actual Sales (in M)",
                },
              ],
              chartOptions: {
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: "Month",
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: "Sales (in M)",
                    },
                    beginAtZero: false,
                  },
                },
                plugins: {
                  datalabels: {
                    display: true,
                  },
                  title: {
                    display: true,
                    text: "Sale Trend",
                  },
                  tooltip: {
                    callbacks: {
                      label: {
                        arguments: "tooltipItem",
                        body: "return tooltipItem.dataset.label + ': ' + tooltipItem.formattedValue + ' k';",
                      },
                    },
                  },
                },
              },
              chartStyle: {
                "height.px": 300,
              },
            },
            {
              widget: "bar-chart",
              classes: ["col-md-6", "col-lg-3"],
              title: "Trend in Sales",
              subtitle: "in current year",
              url: "www.google.com",
              info: "<strong>Sale Trend</strong>  in current year",
              datasets: [
                {
                  data: lineChartTwo.actual,
                  label: "Actual Sales (in M)",
                },
                {
                  data: lineChartTwo.expected,
                  label: "Expected Sales (in M)",
                },
              ],
              labels: lineChartTwo.label,
              chartOptions: {
                indexAxis: "y",
                scales: {
                  y: {
                    title: {
                      display: true,
                      text: "Month",
                    },
                    stacked: true,
                  },
                  x: {
                    title: {
                      display: true,
                      text: "Sales (in M)",
                    },
                    grace: "10%",
                    offset: false,
                    ticks: {
                      callback: {
                        arguments: "value, index, ticks",
                        body: "return value + ' M';",
                      },
                    },
                  },
                },
                plugins: {
                  datalabels: {
                    display: "auto",
                  },
                  tooltip: {
                    axis: "y",
                  },
                },
              },
              chartStyle: {
                "height.px": 300,
              },
            },
            {
              widget: "bar-chart",
              classes: ["col-md-6", "col-lg-3"],
              title: "User Count",
              subtitle: "in last year",
              url: "www.google.com",
              info: "<strong>Active User Count</strong>  in last year",
              hideLegend: true,
              datasets: [
                {
                  data: lineChartThere.historicalData
                    .sort((a, b) => {
                      return (
                        new Date(a.time.year, a.time.month - 1) -
                        new Date(b.time.year, b.time.month - 1)
                      );
                    })
                    .map((d) => d.value),
                  label: "User Count (in M)",
                },
              ],
              labels: lineChartThere.historicalData
                .sort((a, b) => {
                  return (
                    new Date(a.time.year, a.time.month - 1) -
                    new Date(b.time.year, b.time.month - 1)
                  );
                })
                .map((d) => new Date(d.time.year, d.time.month - 1)),
              chartOptions: {
                scales: {
                  x: {
                    type: "time",
                    time: {
                      unit: "month",
                      tooltipFormat: "MMMM y",
                    },
                  },
                },
              },
            },
            {
              widget: "bar-chart",
              classes: ["col-md-6", "col-lg-3"],
              title: "Trend in Sales",
              subtitle: "in current year",
              url: "www.google.com",
              info: "<strong>Sale Trend</strong>  in current year",
              dataPresent: loaderData.lineChartFourData.length,
              datasets: [
                {
                  data: loaderData.lineChartFourData.map((d) => d.actual),
                  label: "Actual Sales (in M)",
                },
                {
                  data: loaderData.lineChartFourData.map((d) => d.expected),
                  label: "Expected Sales (in M)",
                },
              ],
              labels: loaderData.lineChartFourData.map((d) => d.month),
              chartOptions: {
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: "Month",
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: "Sales (in M)",
                    },
                    beginAtZero: true,
                  },
                },
                plugins: {
                  datalabels: {
                    display: "auto",
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
              chartStyle: {
                "height.px": 300,
              },
            },
          ],
        },
        {
          classes: ["justify-content-center"],
          widgets: [
            {
              widget: "doughnut-pie-chart",
              classes: ["col-md-6", "col-lg-3"],
              title: "Success Rate",
              subtitle: "For year 2023",
              url: "www.google.com",
              info: "<strong>Success Rate</strong>  in current year",
              datasets: [
                {
                  data: doughnutPieChartOne.value,
                },
              ],
              labels: doughnutPieChartOne.label,
              chartOptions: {
                plugins: {
                  title: {
                    display: true,
                    text: "Test Results",
                  },
                },
              },
            },
            {
              widget: "doughnut-pie-chart",
              classes: ["col-md-6", "col-lg-3"],
              title: "Success Rate",
              subtitle: "For year 2023",
              url: "www.google.com",
              info: "<strong>Success Rate</strong>  in current year",
              datasets: [
                {
                  data: doughnutPieChartOne.value,
                },
              ],
              labels: doughnutPieChartOne.label,
              chartOptions: {
                cutout: 0,
                plugins: {
                  title: {
                    display: true,
                    text: ["Test Results", "(in %)"],
                  },
                  datalabels: {
                    display: "auto",
                  },
                  legend: {
                    position: "bottom",
                    labels: {
                      usePointStyle: true,
                    },
                  },
                  tooltip: {
                    callbacks: {
                      label: {
                        arguments: "tooltipItem",
                        body: "return tooltipItem.label + ': ' + tooltipItem.formattedValue + ' %';",
                      },
                    },
                  },
                },
              },
            },
            {
              widget: "doughnut-pie-chart",
              classes: ["col-md-6", "col-lg-3"],
              title: "Success Rate",
              subtitle: "For year 2023",
              url: "www.google.com",
              info: "<strong>Success Rate</strong>  in current year",
              datasets: [
                {
                  data: doughnutPieChartThere.value,
                  backgroundColor: doughnutPieChartThere.backgroundColor,
                },
              ],
              labels: doughnutPieChartThere.label,
              chartOptions: {
                cutout: "80%",
                borderRadius: 50,
                rotation: -135,
                circumference: 270,
                layout: {
                  padding: {
                    left: 50,
                    right: 50,
                    top: 25,
                    bottom: 25,
                  },
                },
                plugins: {
                  title: {
                    display: true,
                    text: "Test Results",
                  },
                  legend: {
                    position: "bottom",
                    labels: {
                      usePointStyle: true,
                    },
                  },
                },
              },
            },
            {
              widget: "doughnut-pie-chart",
              classes: ["col-md-6", "col-lg-3"],
              title: "Success Rate",
              subtitle: "For year 2023",
              url: "www.google.com",
              info: "<strong>Success Rate</strong>  in current year",
              datasets: [
                {
                  data: doughnutPieChartFour.value1,
                  datalabels: {
                    anchor: "end",
                  },
                },
                {
                  data: doughnutPieChartFour.value2,
                  datalabels: {
                    anchor: "center",
                    backgroundColor: null,
                    borderWidth: 0,
                  },
                },
                {
                  data: doughnutPieChartFour.value3,
                  datalabels: {
                    anchor: "start",
                  },
                },
              ],
              labels: doughnutPieChartFour.label,
              chartOptions: {
                backgroundColor: doughnutPieChartFour.background,
                layout: {
                  padding: 10,
                },
                borderColor: "darkbrown",
                plugins: {
                  datalabels: {
                    display: true,
                    backgroundColor: {
                      arguments: "context",
                      body: "return context.chart.config.options.backgroundColor;",
                    },
                    borderColor: "darkbrown",
                    borderRadius: 25,
                    borderWidth: 2,
                    color: "white",
                    font: {
                      weight: "bold",
                    },
                    padding: 6,
                  },
                },
              },
            },
          ],
        },
        {
          classes: ["justify-content-center"],
          widgets: [
            // {
            //   widget: "stat-graph-card",
            //   classes: ["col-md-6", "col-lg-3"],
            //   title: "User Count (Stat only)",
            //   subtitle: "in last year",
            //   info: "<strong>Active User Count</strong>  in last year",
            //   stat: {
            //     value: "3.04 Million",
            //     showSeparateUnit: true,
            //   },
            //   dataPresent: false,
            //   dataAbsentText: "Historical data unavailable right now",
            // },
            {
              widget: "stat-graph-card",
              classes: ["col-md-6", "col-lg-3"],
              title: "User Count (Stat + Graph)",
              subtitle: "in last year",
              info: "<strong>Active User Count</strong>  in last year",
              stat: {
                value: "3.04 Million",
                showSeparateUnit: true,
              },
              datasets: [
                {
                  data: [
                    0.2, 0.4, 0.5, 0.8, 0.9, 1.2, 1.5, 1.9, 2.3, 2.7, 2.5, 3.04,
                  ],
                  label: "User Count (in M)",
                },
              ],
              labels: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
            },
            {
              widget: "stat-graph-card",
              classes: ["col-md-6", "col-lg-3"],
              title: "User Count (Stat + Graph)",
              subtitle: "in last year",
              info: "<strong>Active User Count</strong>  in last year",
              stat: {
                value: "3.4 Million",
                showSeparateUnit: true,
              },
              datasets: [
                {
                  data: [
                    {
                      month: "Jan",
                      value: 1.23,
                    },
                    {
                      month: "Feb",
                      value: 1.89,
                    },
                    {
                      month: "Mar",
                      value: 2.45,
                    },
                    {
                      month: "Apr",
                      value: 2.41,
                    },
                    {
                      month: "May",
                      value: 2.75,
                    },
                    {
                      month: "Jun",
                      value: 3.4,
                    },
                  ],
                  label: "User Count (in M)",
                  parsing: {
                    xAxisKey: "month",
                    yAxisKey: "value",
                  },
                },
              ],
              chartStyle: {
                "height.px": 250,
              },
            },
            {
              widget: "stat-graph-card",
              classes: ["col-md-6", "col-lg-3"],
              title: "User Count (Dynamic Stat & Graph from Variables)",
              subtitle: "in last year",
              info: "<strong>Active User Count</strong>  in last year",
              stat: {
                value: lineChartThere.total + "Million",
                showSeparateUnit: true,
              },
              dataPresent: lineChartThere.historicalData.length,
              datasets: [
                {
                  data: lineChartThere.historicalData
                    .sort((a, b) => {
                      return (
                        new Date(a.time.year, a.time.month - 1) -
                        new Date(b.time.year, b.time.month - 1)
                      );
                    })
                    .map((d) => d.value),
                  label: "User Count (in M)",
                },
              ],
              labels: lineChartThere.historicalData
                .sort((a, b) => {
                  return (
                    new Date(a.time.year, a.time.month - 1) -
                    new Date(b.time.year, b.time.month - 1)
                  );
                })
                .map((d) => new Date(d.time.year, d.time.month - 1)),
              chartOptions: {
                scales: {
                  x: {
                    type: "time",
                    time: {
                      unit: "month",
                      tooltipFormat: "MMMM y",
                    },
                  },
                },
              },
            },
            {
              widget: "stat-graph-card",
              classes: ["col-md-6", "col-lg-3"],
              title: "User Count (Dynamic Stat & Graph from HTTP request)",
              subtitle: "in last year",
              url: "www.google.com",
              info: "<strong>Active User Count</strong>  in last year",
              stat: {
                value: lineChartThere.total + "Million",
                showSeparateUnit: true,
              },
              dataPresent: lineChartThere.historicalData.length,
              datasets: [
                {
                  data: lineChartThere.historicalData
                    .sort((a, b) => {
                      return (
                        new Date(a.time.year, a.time.month - 1) -
                        new Date(b.time.year, b.time.month - 1)
                      );
                    })
                    .map((d) => d.value),
                  label: "User Count (in M)",
                },
              ],
              labels: lineChartThere.historicalData
                .sort((a, b) => {
                  return (
                    new Date(a.time.year, a.time.month - 1) -
                    new Date(b.time.year, b.time.month - 1)
                  );
                })
                .map((d) => new Date(d.time.year, d.time.month - 1)),
              chartOptions: {
                scales: {
                  x: {
                    type: "time",
                    time: {
                      unit: "month",
                      tooltipFormat: "MMMM y",
                    },
                  },
                },
              },
            },
          ],
        },
        {
          classes: ["justify-content-center"],
          widgets: [
            {
              widget: "small-stat",
              classes: ["col-md-6", "col-lg-3"],
              title: "User Count",
              value: "3.07",
              unit: "Million",
              showSeparateUnit: true,
              displayAsIndividualCard: false,
              icon: "groups",
            },
            {
              widget: "small-stat",
              classes: ["col-md-6", "col-lg-3"],
              title: "User Count",
              subtitle: "(normal view)",
              value: "3.07 Million",
              showSeparateUnit: true,
              trend: "up",
              info: "abc",
              icon: "groups",
            },
            {
              widget: "small-stat",
              classes: ["col-md-6", "col-lg-3"],
              title: "User Count",
              subtitle: "(card view)",
              value: "3.07 Million",
              showSeparateUnit: true,
              displayAsIndividualCard: true,
              trend: "up",
              info: "abc",
              icon: "groups",
            },
            {
              widget: "small-stat",
              classes: ["col-md-6", "col-lg-3"],
              title: "User Count",
              subtitle: "(Dynamic from HTTP req)",
              value: lineChartThere.total + " Million",
              showSeparateUnit: true,
              displayAsIndividualCard: true,
              trend:
                "() => {\n  let historicalData = ${{0.sampleResponse1.data.users.historicalData}};\n  if (historicalData?.length > 2) {\n    historicalData = historicalData\n      .sort((a, b) => {\n        return (\n          new Date(a.time.year, a.time.month - 1) -\n          new Date(b.time.year, b.time.month - 1)\n        );\n      })\n      .slice(-2);\n    let oldValue = historicalData[0].value;\n    let newValue = historicalData[1].value;\n    return newValue > oldValue ? 'up' : newValue < oldValue ? 'down' : 'flat';\n  } else {\n    return '';\n  }\n};\n",
              info: "abc",
              icon: "groups",
            },
          ],
        },
        {
          classes: ["justify-content-center"],
          widgets: [
            {
              widget: "progress-chart",
              classes: ["col-12"],
              clickable: true,
              datasets: [
                {
                  title: "Category A",
                  classes: ["col-md-6"],
                  max: 50,
                  value: 30,
                  customId: 1,
                },
                {
                  title: "Category B",
                  classes: ["col-md-6"],
                  max: 50,
                  value: 40,
                  customId: 1,
                },
                {
                  title: "Category C",
                  classes: ["col-md-6"],
                  max: 50,
                  value: 10,
                  customId: 1,
                },
                {
                  title: "Category D",
                  classes: ["col-md-6"],
                  max: 50,
                  value: 50,
                  customId: 1,
                },
              ],
            },
          ],
        },
      ],
    };
    // document.getElementById("jsonDisplay").innerText = JSON.stringify(
    //   widgetContainer.jsonInput,
    //   null,
    //   4,
    // );
  }, []);

  return (
    <div>
      <json-widgets id="widgetContainer" />
      <script src="https://ani-json-widget-micro-frontend.surge.sh/polyfills.js" />
      <script src="https://ani-json-widget-micro-frontend.surge.sh/main.js" />
    </div>
  );
};

export default OrderData;
