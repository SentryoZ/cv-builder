export default {
  "options": {
    "x": "10px",
    "y": "10px",
    "primary-color": "#ffffff",
    "text-color": "#000000"
  },
  "sections": [
    {
      "type": "block",
      "name": "Skills",
      "width": "col-3",
      "contents": [
        {
          "type": "block",
          "name": "ABC xyz",
          "width": "col-12",
          "contents": [
            {
              "type": "text",
              "name": "Text abc",
              "value": "short text"
            },
            {
              "type": "textarea",
              "name": "self desc",
              "value": "dasoikj aodpko kapoakspokd owkoapkdos kpdwkapos"
            },
            {
              "type": "image",
              "name": "Image",
              "value": "image.link/abcxyz.png"
            }
          ]
        },
        {
          "type": "block",
          "name": "Webs",
          "width": "col-12",
          "contents": [
            {
              "type": "range",
              "name": "HTML",
              "value": 50
            },
            {
              "type": "range",
              "name": "JS",
              "value": 50
            },
            {
              "type": "range",
              "name": "PHP",
              "value": 50
            }
          ]
        }
      ]
    }
  ]
}
