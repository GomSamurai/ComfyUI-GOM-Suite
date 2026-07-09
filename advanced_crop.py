import torch

class AdvancedImageCrop:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "crop_mode": (["Manual", "Center Square", "Top Half", "Bottom Half", "Left Half", "Right Half"], {"default": "Manual"}),
                "x_offset": ("INT", {"default": 0, "min": 0, "max": 99999, "step": 1}),
                "y_offset": ("INT", {"default": 0, "min": 0, "max": 99999, "step": 1}),
                "width": ("INT", {"default": 512, "min": 1, "max": 99999, "step": 1}),
                "height": ("INT", {"default": 512, "min": 1, "max": 99999, "step": 1}),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "crop_image"
    CATEGORY = "GOM/image/transform"

    def crop_image(self, image, crop_mode, x_offset, y_offset, width, height):
        # image shape is (batch, height, width, channels)
        batch_size, img_height, img_width, channels = image.shape

        if crop_mode == "Center Square":
            min_dim = min(img_width, img_height)
            width = min_dim
            height = min_dim
            x_offset = (img_width - width) // 2
            y_offset = (img_height - height) // 2
        elif crop_mode == "Top Half":
            width = img_width
            height = img_height // 2
            x_offset = 0
            y_offset = 0
        elif crop_mode == "Bottom Half":
            width = img_width
            height = img_height - (img_height // 2)
            x_offset = 0
            y_offset = img_height // 2
        elif crop_mode == "Left Half":
            width = img_width // 2
            height = img_height
            x_offset = 0
            y_offset = 0
        elif crop_mode == "Right Half":
            width = img_width - (img_width // 2)
            height = img_height
            x_offset = img_width // 2
            y_offset = 0

        # Ensure bounds are within the image
        x_offset = max(0, min(x_offset, img_width - 1))
        y_offset = max(0, min(y_offset, img_height - 1))
        
        # Ensure crop width and height do not exceed image dimensions from the offset
        actual_width = min(width, img_width - x_offset)
        actual_height = min(height, img_height - y_offset)

        # Crop the image tensor
        cropped_image = image[:, y_offset:y_offset+actual_height, x_offset:x_offset+actual_width, :]

        return (cropped_image,)
