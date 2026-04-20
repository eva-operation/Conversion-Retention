
// @ts-ignore
import Chart from 'chart.js/auto';

const SHARED_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Poppins:wght@400;600;700&display=swap');

  .email-preview-wrapper {
    width: 600px;
    margin: 0 auto;
    font-family: 'Poppins', sans-serif;
  }

  .email-preview-wrapper .box {
    --card-bg: #ffffff;
    --border: #e2e8f0;
    --text: #0f172a;
    --muted: #64748b;
    --green: #16a34a;
    --red: #dc2626;
    background: #f8fafc;
    color: var(--text);
    padding: 20px;
    border: 1px solid var(--border);
    border-radius: 16px;
  }

  .email-preview-wrapper * { box-sizing: border-box; }

  .email-preview-wrapper .dashboard-title {
    font-size: 15px;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 16px;
  }

  .email-preview-wrapper .dashboard-title span {
    font-weight: 600;
    color: var(--muted);
  }

  .email-preview-wrapper .top-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .email-preview-wrapper .mid-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
    margin-top: 10px;
  }

  .email-preview-wrapper .bottom-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
    margin-top: 10px;
  }

  .email-preview-wrapper .card {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 12px;
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  }

  .email-preview-wrapper .card-title {
    font-size: 11px;
    font-weight: 600;
    color: var(--muted);
    margin-bottom: 8px;
  }

  .email-preview-wrapper .metric-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2px;
  }

  .email-preview-wrapper .metric-value {
    font-family: 'JetBrains Mono', monospace;
    font-size: 15px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .email-preview-wrapper .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    display: inline-block;
    flex-shrink: 0;
  }

  .email-preview-wrapper .badge {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    font-weight: 600;
  }

  .email-preview-wrapper .badge.up   { color: var(--green); }
  .email-preview-wrapper .badge.down { color: var(--red);   }

  .email-preview-wrapper .sub-value {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: var(--muted);
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .email-preview-wrapper .period-label {
    font-size: 9px;
    color: #94a3b8;
    text-align: right;
    font-style: italic;
  }

  .email-preview-wrapper .chart-wrap {
    margin-top: 8px;
    height: 90px;
    position: relative;
  }

  .email-preview-wrapper canvas { width: 100% !important; }

  .email-preview-wrapper .footer-link {
    margin-top: 16px;
    text-align: right;
  }

  .email-preview-wrapper .footer-link a {
    font-size: 11px;
    font-weight: 600;
    color: #6366f1;
    text-decoration: none;
    border-bottom: 1px solid #c7d2fe;
    padding-bottom: 1px;
  }

  .email-preview-wrapper .strategy-text {
    width: 100%;
    margin-top: 20px;
    font-size: 13px;
    color: #64748b;
    font-style: italic;
    line-height: 1.7;
    padding-left: 5px;
  }

  .email-preview-wrapper .regards-text {
    margin-top: 20px;
    font-size: 13px;
    font-weight: 600;
    color: #0f172a;
    line-height: 1.6;
    padding-left: 5px;
  }
`;

export const getEmailHTML = (projectName: string, weekLabel: string) => `
<div class="email-preview-wrapper">
  <p><br></p>
  <style>${SHARED_CSS}</style>
  
  <div class="box">
    <div class="dashboard-title">
      ${projectName} PPC Performance <span>– ${weekLabel}</span>
    </div>

    <div class="top-row">
      <div class="card">
        <div class="card-title">Ad Spend</div>
        <div class="metric-row">
          <div class="metric-value"><span class="dot" style="background:#ef4444"></span>$4,854.74</div>
          <div class="badge up">&#9650; 9.03%</div>
        </div>
        <div class="metric-row">
          <div class="sub-value"><span class="dot" style="background:#fca5a5"></span>$7,320.83</div>
          <div class="period-label">less than prev.</div>
        </div>
        <div class="chart-wrap"><canvas id="ch-adspend"></canvas></div>
      </div>

      <div class="card">
        <div class="card-title">Total Expense</div>
        <div class="metric-row">
          <div class="metric-value"><span class="dot" style="background:#ef4444"></span>$24,854.74</div>
          <div class="badge down">&#9660; 9.03%</div>
        </div>
        <div class="metric-row">
          <div class="sub-value"><span class="dot" style="background:#fca5a5"></span>$27,320.83</div>
          <div class="period-label">less than prev.</div>
        </div>
        <div class="chart-wrap"><canvas id="ch-expense"></canvas></div>
      </div>
    </div>

    <div class="mid-row">
      <div class="card">
        <div class="card-title">Advertising Sales</div>
        <div class="metric-row">
          <div class="metric-value"><span class="dot" style="background:#06b6d4"></span>$12,563.88</div>
          <div class="badge down">&#9660; 5.76%</div>
        </div>
        <div class="metric-row">
          <div class="sub-value"><span class="dot" style="background:#a5f3fc"></span>$13,331.18</div>
          <div class="period-label">less than prev.</div>
        </div>
        <div class="chart-wrap"><canvas id="ch-adsales"></canvas></div>
      </div>

      <div class="card">
        <div class="card-title">Organic Sales</div>
        <div class="metric-row">
          <div class="metric-value"><span class="dot" style="background:#14b8a6"></span>$15,168.70</div>
          <div class="badge up">&#9650; 11.14%</div>
        </div>
        <div class="metric-row">
          <div class="sub-value"><span class="dot" style="background:#99f6e4"></span>$13,647.88</div>
          <div class="period-label">more than prev.</div>
        </div>
        <div class="chart-wrap"><canvas id="ch-organic"></canvas></div>
      </div>

      <div class="card">
        <div class="card-title">Total Sales</div>
        <div class="metric-row">
          <div class="metric-value"><span class="dot" style="background:#22c55e"></span>$27,732.58</div>
          <div class="badge up">&#9650; 2.79%</div>
        </div>
        <div class="metric-row">
          <div class="sub-value"><span class="dot" style="background:#bbf7d0"></span>$26,979.06</div>
          <div class="period-label">more than prev.</div>
        </div>
        <div class="chart-wrap"><canvas id="ch-totalsales"></canvas></div>
      </div>
    </div>

    <div class="bottom-row">
      <div class="card">
        <div class="card-title">ACoS</div>
        <div class="metric-row">
          <div class="metric-value"><span class="dot" style="background:#6366f1"></span>61.57%</div>
          <div class="badge up">&#9650; 16.31%</div>
        </div>
        <div class="metric-row">
          <div class="sub-value"><span class="dot" style="background:#c7d2fe"></span>73.57%</div>
          <div class="period-label">less than prev.</div>
        </div>
        <div class="chart-wrap"><canvas id="ch-acos"></canvas></div>
      </div>

      <div class="card">
        <div class="card-title">TACoS</div>
        <div class="metric-row">
          <div class="metric-value"><span class="dot" style="background:#ec4899"></span>27.89%</div>
          <div class="badge down">&#9660; 23.27%</div>
        </div>
        <div class="metric-row">
          <div class="sub-value"><span class="dot" style="background:#fbcfe8"></span>36.35%</div>
          <div class="period-label">less than prev.</div>
        </div>
        <div class="chart-wrap"><canvas id="ch-tacos"></canvas></div>
      </div>

      <div class="card">
        <div class="card-title">Net Profit</div>
        <div class="metric-row">
          <div class="metric-value"><span class="dot" style="background:#22c55e"></span>$2,877.84</div>
          <div class="badge up">&#9650; 942.04%</div>
        </div>
        <div class="metric-row">
          <div class="sub-value"><span class="dot" style="background:#bbf7d0"></span>-$341.77</div>
          <div class="period-label">more than prev.</div>
        </div>
        <div class="chart-wrap"><canvas id="ch-profit"></canvas></div>
      </div>
    </div>

    <div class="footer-link">
      <a href="https://bf.eva.guru/analytics/product">Click here to see details &#8594;</a>
    </div>
  </div>

  <div class="strategy-text">
    &lt;Write details of advertising strategy.....&gt;
  </div>
  <div class="regards-text">
    Best Regards,
  </div>
</div>
`;

export const renderEmailCharts = () => {
  const getChart = (id: string) => Chart.getChart(id);

  const makeBar = (canvasId: string, prevColor: string, currColor: string, prevVal: number, currVal: number, isPercent: boolean) => {
    const ctx = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!ctx) return;

    const existing = getChart(canvasId);
    if (existing) existing.destroy();

    const tickCb = isPercent
      ? function (v: any) { return v + '%'; }
      : function (v: any) { return '$' + (v >= 1000 ? (v / 1000) + 'K' : v); };

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Week 5', 'Week 6'],
        datasets: [{
          data: [prevVal, currVal],
          backgroundColor: [prevColor, currColor],
          borderRadius: 4,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function (ctx: any) {
                return isPercent ? (ctx.raw as any) + '%' : '$' + (ctx.raw as any).toLocaleString();
              }
            }
          }
        },
        scales: {
          x: {
            ticks: { color: '#94a3b8', font: { size: 8, family: 'Poppins' } },
            grid: { display: false },
            border: { display: false }
          },
          y: {
            ticks: {
              color: '#94a3b8',
              font: { size: 8, family: 'Poppins' },
              callback: tickCb
            },
            grid: { color: 'rgba(0,0,0,0.05)' },
            border: { display: false }
          }
        }
      }
    });
  };

  makeBar('ch-adspend', '#fca5a5', '#ef4444', 7320.83, 4854.74, false);
  makeBar('ch-expense', '#fca5a5', '#ef4444', 27320.83, 24854.74, false);
  makeBar('ch-adsales', '#a5f3fc', '#06b6d4', 13331.18, 12563.88, false);
  makeBar('ch-organic', '#99f6e4', '#14b8a6', 13647.88, 15168.70, false);
  makeBar('ch-totalsales', '#bbf7d0', '#22c55e', 26979.06, 27732.58, false);
  makeBar('ch-acos', '#c7d2fe', '#6366f1', 73.57, 61.57, true);
  makeBar('ch-tacos', '#fbcfe8', '#ec4899', 36.35, 27.89, true);

  const profitCtx = document.getElementById('ch-profit') as HTMLCanvasElement;
  if (profitCtx) {
    const existing = getChart('ch-profit');
    if (existing) existing.destroy();

    new Chart(profitCtx, {
      type: 'bar',
      data: {
        labels: ['Week 5', 'Week 6'],
        datasets: [{
          data: [-341.77, 2877.84],
          backgroundColor: ['#bbf7d0', '#22c55e'],
          borderRadius: 4,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            ticks: { color: '#94a3b8', font: { size: 8, family: 'Poppins' } },
            grid: { display: false },
            border: { display: false }
          },
          y: {
            ticks: {
              color: '#94a3b8',
              font: { size: 8, family: 'Poppins' },
              callback: function (v: any) { return '$' + v.toLocaleString(); }
            },
            grid: { color: 'rgba(0,0,0,0.05)' },
            border: { display: false }
          }
        }
      }
    });
  }
};

export const generateEmailTemplate = (projectName: string, weekLabel: string) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Analytics Dashboard</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"></script>
<style>
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Poppins:wght@400;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --card-bg: #ffffff;
    --border: #e2e8f0;
    --text: #0f172a;
    --muted: #64748b;
    --green: #16a34a;
    --red: #dc2626;
  }

  body {
    background: transparent;
    color: var(--text);
    font-family: 'Poppins', sans-serif;
    padding: 20px;
  }

  .wrapper {
    width: 600px;
    margin: 0 auto;
  }

  .box {
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 20px;
    background: #f8fafc;
  }

  .dashboard-title {
    font-size: 15px;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 16px;
  }

  .dashboard-title span {
    font-weight: 600;
    color: var(--muted);
  }

  .top-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .mid-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
    margin-top: 10px;
  }

  .bottom-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
    margin-top: 10px;
  }

  .card {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 12px;
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  }

  .card-title {
    font-size: 11px;
    font-weight: 600;
    color: var(--muted);
    margin-bottom: 8px;
  }

  .metric-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2px;
  }

  .metric-value {
    font-family: 'JetBrains Mono', monospace;
    font-size: 15px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    display: inline-block;
    flex-shrink: 0;
  }

  .badge {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    font-weight: 600;
  }

  .badge.up   { color: var(--green); }
  .badge.down { color: var(--red);   }

  .sub-value {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: var(--muted);
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .period-label {
    font-size: 9px;
    color: #94a3b8;
    text-align: right;
    font-style: italic;
  }

  .chart-wrap {
    margin-top: 8px;
    height: 90px;
    position: relative;
  }

  canvas { width: 100% !important; }

  .footer-link {
    margin-top: 16px;
    text-align: right;
  }

  .footer-link a {
    font-size: 11px;
    font-weight: 600;
    color: #6366f1;
    text-decoration: none;
    border-bottom: 1px solid #c7d2fe;
    padding-bottom: 1px;
  }

  .footer-link a:hover { color: #4f46e5; }
</style>
</head>
<body>
<p><br></p>
<div class="wrapper">
  <!-- The Box with border -->
  <div class="box">
    <!-- Title -->
    <div class="dashboard-title">
      \${projectName} PPC Performance <span>– \${weekLabel}</span>
    </div>

    <!-- Top row -->
    <div class="top-row">
      <div class="card">
        <div class="card-title">Ad Spend</div>
        <div class="metric-row">
          <div class="metric-value"><span class="dot" style="background:#ef4444"></span>$4,854.74</div>
          <div class="badge up">&#9650; 9.03%</div>
        </div>
        <div class="metric-row">
          <div class="sub-value"><span class="dot" style="background:#fca5a5"></span>$7,320.83</div>
          <div class="period-label">less than prev.</div>
        </div>
        <div class="chart-wrap"><canvas id="ch-adspend"></canvas></div>
      </div>

      <div class="card">
        <div class="card-title">Total Expense</div>
        <div class="metric-row">
          <div class="metric-value"><span class="dot" style="background:#ef4444"></span>$24,854.74</div>
          <div class="badge down">&#9660; 9.03%</div>
        </div>
        <div class="metric-row">
          <div class="sub-value"><span class="dot" style="background:#fca5a5"></span>$27,320.83</div>
          <div class="period-label">less than prev.</div>
        </div>
        <div class="chart-wrap"><canvas id="ch-expense"></canvas></div>
      </div>
    </div>

    <!-- Mid row -->
    <div class="mid-row">
      <div class="card">
        <div class="card-title">Advertising Sales</div>
        <div class="metric-row">
          <div class="metric-value"><span class="dot" style="background:#06b6d4"></span>$12,563.88</div>
          <div class="badge down">&#9660; 5.76%</div>
        </div>
        <div class="metric-row">
          <div class="sub-value"><span class="dot" style="background:#a5f3fc"></span>$13,331.18</div>
          <div class="period-label">less than prev.</div>
        </div>
        <div class="chart-wrap"><canvas id="ch-adsales"></canvas></div>
      </div>

      <div class="card">
        <div class="card-title">Organic Sales</div>
        <div class="metric-row">
          <div class="metric-value"><span class="dot" style="background:#14b8a6"></span>$15,168.70</div>
          <div class="badge up">&#9650; 11.14%</div>
        </div>
        <div class="metric-row">
          <div class="sub-value"><span class="dot" style="background:#99f6e4"></span>$13,647.88</div>
          <div class="period-label">more than prev.</div>
        </div>
        <div class="chart-wrap"><canvas id="ch-organic"></canvas></div>
      </div>

      <div class="card">
        <div class="card-title">Total Sales</div>
        <div class="metric-row">
          <div class="metric-value"><span class="dot" style="background:#22c55e"></span>$27,732.58</div>
          <div class="badge up">&#9650; 2.79%</div>
        </div>
        <div class="metric-row">
          <div class="sub-value"><span class="dot" style="background:#bbf7d0"></span>$26,979.06</div>
          <div class="period-label">more than prev.</div>
        </div>
        <div class="chart-wrap"><canvas id="ch-totalsales"></canvas></div>
      </div>
    </div>

    <!-- Bottom row -->
    <div class="bottom-row">
      <div class="card">
        <div class="card-title">ACoS</div>
        <div class="metric-row">
          <div class="metric-value"><span class="dot" style="background:#6366f1"></span>61.57%</div>
          <div class="badge up">&#9650; 16.31%</div>
        </div>
        <div class="metric-row">
          <div class="sub-value"><span class="dot" style="background:#c7d2fe"></span>73.57%</div>
          <div class="period-label">less than prev.</div>
        </div>
        <div class="chart-wrap"><canvas id="ch-acos"></canvas></div>
      </div>

      <div class="card">
        <div class="card-title">TACoS</div>
        <div class="metric-row">
          <div class="metric-value"><span class="dot" style="background:#ec4899"></span>27.89%</div>
          <div class="badge down">&#9660; 23.27%</div>
        </div>
        <div class="metric-row">
          <div class="sub-value"><span class="dot" style="background:#fbcfe8"></span>36.35%</div>
          <div class="period-label">less than prev.</div>
        </div>
        <div class="chart-wrap"><canvas id="ch-tacos"></canvas></div>
      </div>

      <div class="card">
        <div class="card-title">Net Profit</div>
        <div class="metric-row">
          <div class="metric-value"><span class="dot" style="background:#22c55e"></span>$2,877.84</div>
          <div class="badge up">&#9650; 942.04%</div>
        </div>
        <div class="metric-row">
          <div class="sub-value"><span class="dot" style="background:#bbf7d0"></span>-$341.77</div>
          <div class="period-label">more than prev.</div>
        </div>
        <div class="chart-wrap"><canvas id="ch-profit"></canvas></div>
      </div>
    </div>

    <!-- Footer link -->
    <div class="footer-link">
      <a href="https://bf.eva.guru/analytics/product">Click here to see details &#8594;</a>
    </div>
  </div> <!-- End of Box -->

  <!-- Strategy text and Regards - outside the border box -->
  <div style="margin-top:20px; padding-left: 5px;">
    <p style="font-family:'Poppins',sans-serif; font-size:13px; color:#64748b; font-style:italic; line-height:1.7; margin-bottom:20px;">
      &lt;Write details of advertising strategy.....&gt;
    </p>
    <p style="font-family:'Poppins',sans-serif; font-size:13px; font-weight:600; color:#0f172a; line-height:1.6;">
      Best Regards,
    </p>
  </div>
</div>

<script>
function makeBar(canvasId, prevColor, currColor, prevVal, currVal, isPercent) {
  var tickCb = isPercent
    ? function(v) { return v + '%'; }
    : function(v) { return '$' + (v >= 1000 ? (v / 1000) + 'K' : v); };

  new Chart(document.getElementById(canvasId), {
    type: 'bar',
    data: {
      labels: ['Week 5', 'Week 6'],
      datasets: [{
        data: [prevVal, currVal],
        backgroundColor: [prevColor, currColor],
        borderRadius: 4,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(ctx) {
              return isPercent ? ctx.raw + '%' : '$' + ctx.raw.toLocaleString();
            }
          }
        }
      },
      scales: {
        x: {
          ticks: { color: '#94a3b8', font: { size: 8, family: 'Poppins' } },
          grid: { display: false },
          border: { display: false }
        },
        y: {
          ticks: {
            color: '#94a3b8',
            font: { size: 8, family: 'Poppins' },
            callback: tickCb
          },
          grid: { color: 'rgba(0,0,0,0.05)' },
          border: { display: false }
        }
      }
    }
  });
}

makeBar('ch-adspend',    '#fca5a5', '#ef4444', 7320.83,  4854.74,  false);
makeBar('ch-expense',    '#fca5a5', '#ef4444', 27320.83, 24854.74, false);
makeBar('ch-adsales',    '#a5f3fc', '#06b6d4', 13331.18, 12563.88, false);
makeBar('ch-organic',    '#99f6e4', '#14b8a6', 13647.88, 15168.70, false);
makeBar('ch-totalsales', '#bbf7d0', '#22c55e', 26979.06, 27732.58, false);
makeBar('ch-acos',       '#c7d2fe', '#6366f1', 73.57,    61.57,    true);
makeBar('ch-tacos',      '#fbcfe8', '#ec4899', 36.35,    27.89,    true);

new Chart(document.getElementById('ch-profit'), {
  type: 'bar',
  data: {
    labels: ['Week 5', 'Week 6'],
    datasets: [{
      data: [-341.77, 2877.84],
      backgroundColor: ['#bbf7d0', '#22c55e'],
      borderRadius: 4,
      borderSkipped: false
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        ticks: { color: '#94a3b8', font: { size: 8, family: 'Poppins' } },
        grid: { display: false },
        border: { display: false }
      },
      y: {
        ticks: {
          color: '#94a3b8',
          font: { size: 8, family: 'Poppins' },
          callback: function(v) { return '$' + v.toLocaleString(); }
        },
        grid: { color: 'rgba(0,0,0,0.05)' },
        border: { display: false }
      }
    }
  }
});
</script>
</body>
</html>`;
