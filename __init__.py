from .gom_configurator import GOM_Configurator

NODE_CLASS_MAPPINGS = {
    "GOM_Configurator": GOM_Configurator
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "GOM_Configurator": "GOM Workflow Configurator"
}

WEB_DIRECTORY = "./js"

__all__ = ['NODE_CLASS_MAPPINGS', 'NODE_DISPLAY_NAME_MAPPINGS', 'WEB_DIRECTORY']
