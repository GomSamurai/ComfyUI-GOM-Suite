class GOM_Hardware_Sentinel:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {},
            "hidden": {"id": "UNIQUE_ID"}
        }

    RETURN_TYPES = ()
    FUNCTION = "noop"
    CATEGORY = "GOM/utils"
    OUTPUT_NODE = True
    DESCRIPTION = "Hardware Sentinel te permite proteger tu tarjeta gráfica y automatizar la cola de renderizado. Puedes usar el modo Termostato para pausar la generación hasta que la gráfica se enfríe, o el modo Temporizador para generar a intervalos regulares. También incluye utilidades para limpiar la VRAM y apagar el sistema automáticamente."

    def noop(self, **kwargs):
        return ()
