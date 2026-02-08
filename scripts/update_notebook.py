import json
import os

notebook_path = r'e:\Ai\oil-change-point-analysis\notebooks\01_exploratory_data_analysis.ipynb'

with open(notebook_path, 'r', encoding='utf-8') as f:
    nb = json.load(f)

# Update first code cell (imports)
import_cell = nb['cells'][1] # 0 is markdown, 1 is code
if import_cell['cell_type'] == 'code':
    source = import_cell['source']
    new_source = [
        "import os\n",
        "import pandas as pd\n",
        "import numpy as np\n",
        "import matplotlib.pyplot as plt\n",
        "import seaborn as sns\n",
        "from statsmodels.tsa.stattools import adfuller\n",
        "\n",
        "# Output path for figures\n",
        "FIG_PATH = '../Docs/figures'\n",
        "os.makedirs(FIG_PATH, exist_ok=True)\n",
        "\n",
        "# Set aesthetic style\n",
        "plt.style.use('ggplot')\n",
        "sns.set_palette(\"viridis\")"
    ]
    import_cell['source'] = new_source

# Update plotting cells
for cell in nb['cells']:
    if cell['cell_type'] == 'code':
        source_text = "".join(cell['source'])
        if "Historical Brent Oil Prices" in source_text and "plt.show()" in source_text:
            cell['source'] = [s.replace("plt.show()", "plt.savefig(os.path.join(FIG_PATH, 'price_trend.png'))\nplt.show()") for s in cell['source']]
        elif "Daily Log Returns" in source_text and "plt.show()" in source_text:
            cell['source'] = [s.replace("plt.show()", "plt.savefig(os.path.join(FIG_PATH, 'daily_returns_volatility.png'))\nplt.show()") for s in cell['source']]

with open(notebook_path, 'w', encoding='utf-8') as f:
    json.dump(nb, f, indent=1)

print("Notebook updated successfully.")
