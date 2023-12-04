(function(vegaEmbed) {
    var spec = {"config": {"view": {"continuousWidth": 300, "continuousHeight": 300}, "axis": {"labelFontSize": 15, "titleFont": "Arial", "titleFontSize": 20, "titlePadding": 20}}, "data": {"name": "data-e0bf7e06c49cb2b22b55c41055ca942a"}, "mark": {"type": "bar", "color": "black"}, "encoding": {"size": {"value": 30}, "x": {"axis": {"labelLimit": 300, "titlePadding": 10}, "field": "episodes_per_month", "title": "Episodes Released Per Month", "type": "quantitative"}, "y": {"axis": {"labelLimit": 450, "titlePadding": 220}, "field": "show_name", "sort": {"field": "total_episodes", "order": "descending"}, "title": "Podcast Shows", "type": "ordinal"}}, "height": 200, "width": 300, "$schema": "https://vega.github.io/schema/vega-lite/v5.16.3.json", "datasets": {"data-e0bf7e06c49cb2b22b55c41055ca942a": [{"show_name": "Dr Berg\u2019s Healthy Keto and Intermittent Fasting Podcast", "episodes_per_month": 53.0}, {"show_name": "Chompers", "episodes_per_month": 46.608695652173914}, {"show_name": "Coach Corey Wayne", "episodes_per_month": 43.92857142857143}, {"show_name": "Sharks, Dinosaurs and Mythical Creatures", "episodes_per_month": 33.0}, {"show_name": "Daf Yomi with Rav Yitzchak Etshalom", "episodes_per_month": 33.0}]}};
    var embedOpt = {"mode": "vega-lite"};

    function showError(el, error){
        el.innerHTML = ('<div style="color:red;">'
                        + '<p>JavaScript Error: ' + error.message + '</p>'
                        + "<p>This usually means there's a typo in your chart specification. "
                        + "See the javascript console for the full traceback.</p>"
                        + '</div>');
        throw error;
    }
    const el = document.getElementById('vis');
    vegaEmbed("#bar-chart-3", spec, embedOpt)
      .catch(error => showError(el, error));
  })(vegaEmbed);