
import sys
import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from pathlib import Path
from datetime import datetime

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from src.db_handler import load_events, load_alerts, init_db

# ─── Page Config ────────────────────────────────────────────────────────────
st.set_page_config(
    page_title="CloudSentinel",
    page_icon="🛡️",
    layout="wide",
    initial_sidebar_state="expanded",
)

# ─── Custom CSS ─────────────────────────────────────────────────────────────
st.markdown("""
<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');

    html, body, [class*="css"] { font-family: 'Inter', sans-serif; }

    .main { background-color: #0d1117; }

    .metric-card {
        background: linear-gradient(135deg, #1e2a3a, #162032);
        border: 1px solid #2a3a50;
        border-radius: 12px;
        padding: 20px;
        text-align: center;
    }
    .metric-value { font-size: 2.5rem; font-weight: 700; color: #58a6ff; }
    .metric-label { font-size: 0.85rem; color: #8b949e; margin-top: 4px; }

    .alert-high   { border-left: 4px solid #f85149; padding: 8px 12px; background: #1a0a0a; border-radius: 4px; margin: 4px 0; }
    .alert-medium { border-left: 4px solid #d29922; padding: 8px 12px; background: #1a1500; border-radius: 4px; margin: 4px 0; }
    .alert-low    { border-left: 4px solid #3fb950; padding: 8px 12px; background: #0a1a0a; border-radius: 4px; margin: 4px 0; }

    .stDataFrame { background: #161b22; }
    .section-title { color: #58a6ff; font-size: 1.1rem; font-weight: 600; margin: 16px 0 8px 0; }
</style>
""", unsafe_allow_html=True)


# ─── Data Loader ─────────────────────────────────────────────────────────────
@st.cache_data(ttl=30)
def get_data():
    try:
        init_db()
        events = load_events()
        alerts = load_alerts()
        return events, alerts
    except Exception as e:
        return pd.DataFrame(), pd.DataFrame()


def severity_color(sev):
    return {"HIGH": "#f85149", "MEDIUM": "#d29922", "LOW": "#3fb950"}.get(sev, "#8b949e")


# ─── Sidebar ─────────────────────────────────────────────────────────────────
with st.sidebar:
    st.image("https://img.icons8.com/color/96/shield.png", width=60)
    st.title("🛡️ CloudSentinel")
    st.caption("AWS Security Monitor")
    st.divider()

    st.subheader("Filters")
    sev_filter = st.multiselect("Severity", ["HIGH", "MEDIUM", "LOW"], default=["HIGH", "MEDIUM", "LOW"])
    refresh = st.button("🔄 Refresh Data", use_container_width=True)
    if refresh:
        st.cache_data.clear()

    st.divider()
    st.caption(f"Last updated: {datetime.now().strftime('%H:%M:%S')}")


# ─── Main ─────────────────────────────────────────────────────────────────────
st.title("🛡️ CloudSentinel — Security Dashboard")
st.caption("Real-time AWS CloudTrail threat monitoring")
st.divider()

events_df, alerts_df = get_data()

# Apply severity filter
if not alerts_df.empty and "severity" in alerts_df.columns:
    filtered_alerts = alerts_df[alerts_df["severity"].isin(sev_filter)]
else:
    filtered_alerts = alerts_df

# ─── KPI Metrics ─────────────────────────────────────────────────────────────
col1, col2, col3, col4 = st.columns(4)

with col1:
    st.markdown(f"""
    <div class="metric-card">
        <div class="metric-value">{len(events_df):,}</div>
        <div class="metric-label">Total API Events</div>
    </div>""", unsafe_allow_html=True)

with col2:
    total_alerts = len(filtered_alerts)
    st.markdown(f"""
    <div class="metric-card">
        <div class="metric-value" style="color:#f85149">{total_alerts}</div>
        <div class="metric-label">Threats Detected</div>
    </div>""", unsafe_allow_html=True)

with col3:
    high_count = len(filtered_alerts[filtered_alerts["severity"] == "HIGH"]) if not filtered_alerts.empty else 0
    st.markdown(f"""
    <div class="metric-card">
        <div class="metric-value" style="color:#f85149">{high_count}</div>
        <div class="metric-label">High Severity</div>
    </div>""", unsafe_allow_html=True)

with col4:
    unique_users = events_df["user_name"].nunique() if not events_df.empty else 0
    st.markdown(f"""
    <div class="metric-card">
        <div class="metric-value">{unique_users}</div>
        <div class="metric-label">Active Users</div>
    </div>""", unsafe_allow_html=True)

st.markdown("<br>", unsafe_allow_html=True)

# ─── Charts Row ──────────────────────────────────────────────────────────────
col_left, col_right = st.columns(2)

with col_left:
    st.markdown('<div class="section-title">📊 API Calls by Event Type</div>', unsafe_allow_html=True)
    if not events_df.empty and "eventName" in events_df.columns:
        top_events = events_df["eventName"].value_counts().head(10).reset_index()
        top_events.columns = ["Event", "Count"]
        fig = px.bar(top_events, x="Count", y="Event", orientation="h",
                     color="Count", color_continuous_scale="Blues",
                     template="plotly_dark")
        fig.update_layout(
            paper_bgcolor="#0d1117", plot_bgcolor="#161b22",
            margin=dict(l=0, r=0, t=10, b=0), showlegend=False, coloraxis_showscale=False
        )
        st.plotly_chart(fig, use_container_width=True)
    else:
        st.info("No event data available.")

with col_right:
    st.markdown('<div class="section-title">🌍 API Calls by Region</div>', unsafe_allow_html=True)
    if not events_df.empty and "awsRegion" in events_df.columns:
        region_counts = events_df["awsRegion"].value_counts().reset_index()
        region_counts.columns = ["Region", "Count"]
        fig2 = px.pie(region_counts, values="Count", names="Region",
                      template="plotly_dark", hole=0.4,
                      color_discrete_sequence=px.colors.sequential.Blues_r)
        fig2.update_layout(paper_bgcolor="#0d1117", margin=dict(l=0, r=0, t=10, b=0))
        st.plotly_chart(fig2, use_container_width=True)
    else:
        st.info("No region data available.")

# ─── Alert Timeline ───────────────────────────────────────────────────────────
st.markdown('<div class="section-title">⏱️ Alert Timeline</div>', unsafe_allow_html=True)
if not filtered_alerts.empty and "eventTime" in filtered_alerts.columns:
    timeline = filtered_alerts.copy()
    timeline["eventTime"] = pd.to_datetime(timeline["eventTime"], errors="coerce")
    timeline = timeline.dropna(subset=["eventTime"])
    if not timeline.empty:
        fig3 = px.scatter(timeline, x="eventTime", y="threat",
                          color="severity",
                          color_discrete_map={"HIGH": "#f85149", "MEDIUM": "#d29922", "LOW": "#3fb950"},
                          hover_data=["user_name", "sourceIPAddress"],
                          template="plotly_dark", size_max=12)
        fig3.update_traces(marker=dict(size=10))
        fig3.update_layout(paper_bgcolor="#0d1117", plot_bgcolor="#161b22",
                           margin=dict(l=0, r=0, t=10, b=0))
        st.plotly_chart(fig3, use_container_width=True)
else:
    st.info("No timeline data available.")

# ─── Threat Alerts Panel ──────────────────────────────────────────────────────
st.markdown('<div class="section-title">🚨 Active Threat Alerts</div>', unsafe_allow_html=True)
if not filtered_alerts.empty:
    for _, row in filtered_alerts.head(20).iterrows():
        sev = row.get("severity", "LOW")
        css_class = f"alert-{sev.lower()}"
        icon = {"HIGH": "🔴", "MEDIUM": "🟡", "LOW": "🟢"}.get(sev, "⚪")
        st.markdown(f"""
        <div class="{css_class}">
            {icon} <strong>{sev}</strong> — {row.get('threat', 'Unknown')}
            &nbsp;|&nbsp; User: <code>{row.get('user_name', 'N/A')}</code>
            &nbsp;|&nbsp; Event: <code>{row.get('eventName', 'N/A')}</code>
            &nbsp;|&nbsp; IP: {row.get('sourceIPAddress', 'N/A')}
        </div>""", unsafe_allow_html=True)
else:
    st.success("✅ No active threats detected.")

# ─── Raw Events Table ─────────────────────────────────────────────────────────
st.markdown('<div class="section-title">📋 Recent Events Log</div>', unsafe_allow_html=True)
if not events_df.empty:
    display_cols = ["eventTime", "user_name", "eventName", "sourceIPAddress", "awsRegion", "errorCode"]
    available = [c for c in display_cols if c in events_df.columns]
    st.dataframe(
        events_df[available].head(50),
        use_container_width=True,
        hide_index=True,
    )
else:
    st.info("No events in database. Run the pipeline first.")
