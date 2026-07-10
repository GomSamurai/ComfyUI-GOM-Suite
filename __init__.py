import server
from aiohttp import web
import torch
import subprocess
import os

from .gom_configurator import GOM_Configurator
from .gom_hardware_sentinel import GOM_Hardware_Sentinel

NODE_CLASS_MAPPINGS = {
    "GOM_Configurator": GOM_Configurator,
    "GOM_Hardware_Sentinel": GOM_Hardware_Sentinel
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "GOM_Configurator": "GOM Workflow Configurator",
    "GOM_Hardware_Sentinel": "GOM Hardware Sentinel 🌡️"
}

WEB_DIRECTORY = "./js"

__all__ = ['NODE_CLASS_MAPPINGS', 'NODE_DISPLAY_NAME_MAPPINGS', 'WEB_DIRECTORY']

# API ROUTES FOR HARDWARE SENTINEL
@server.PromptServer.instance.routes.get("/gom/hardware_status")
async def get_hardware_status(request):
    temp = -1
    try:
        # Use nvidia-smi to get GPU temperature, which is native to NVIDIA drivers
        output = subprocess.check_output(
            ["nvidia-smi", "--query-gpu=temperature.gpu", "--format=csv,noheader"],
            encoding="utf-8",
            creationflags=subprocess.CREATE_NO_WINDOW if os.name == 'nt' else 0
        )
        temp = int(output.strip().split("\n")[0])
    except Exception as e:
        pass
        
    return web.json_response({"gpu_temp": temp})

@server.PromptServer.instance.routes.post("/gom/clean_vram")
async def clean_vram_api(request):
    try:
        if torch.cuda.is_available():
            torch.cuda.empty_cache()
            torch.cuda.ipc_collect()
        return web.json_response({"success": True})
    except Exception as e:
        return web.json_response({"success": False, "error": str(e)})

@server.PromptServer.instance.routes.post("/gom/shutdown_pc")
async def shutdown_pc_api(request):
    try:
        if os.name == 'nt':
            subprocess.Popen(["shutdown", "/s", "/t", "15"])
        else:
            subprocess.Popen(["shutdown", "-h", "1"])
        return web.json_response({"success": True})
    except Exception as e:
        return web.json_response({"success": False, "error": str(e)})
