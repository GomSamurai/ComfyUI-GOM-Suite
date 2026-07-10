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

    def noop(self, **kwargs):
        return ()
