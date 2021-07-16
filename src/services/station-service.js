// import axios from 'axios'
// import { httpService } from './http.service.js'
import { storageService } from './async-storage-service.js'

const STATION_KEY = 'station'
const gStations = [{
    "_id": "5c09",
    "name": "Funky Monks",
    "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUK1LaBaummJfuW6GIM_kt3R9egIlpqVpEKw&usqp=CAU",
    "tags": [
        "Funk",
        "Happy"
    ],
    "createdAt": 1541652422,
    "createdBy": {
        "_id": "u101",
        "fullname": "Puki Ben David",
        "imgUrl": "@/assets/user-img.png"
    },
    "likedByUsers": [
        "{minimal-user}",
        "{minimal-user}"
    ],
    "songs": [{
            "id": "fLexgOxsZu0",
            "title": "The Meters - Cissy Strut",
            "url": "https://www.youtube.com/watch?v=fLexgOxsZu0&ab_channel=BrunoMars",
            "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
            "addedBy": "{minimal-user}"
        },
        {
            "id": "mUkfiLjooxs",
            "title": "The JB's - Pass The Peas",
            "url": "https://www.youtube.com/watch?v=09R8_2nJtjg&ab_channel=Maroon5VEVO",
            "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
            "addedBy": {}
        }
    ]
}, {
    "_id": "5c10",
    "name": "Junky Funks",
    "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlby2ptcAwN49-xSziIMYE8SxChaVDPSGXjg&usqp=CAU",
    "tags": [
        "Funk",
        "Pop",
        "Sad",
        "Romantic"
    ],
    "createdAt": 1541652422,
    "createdBy": {
        "_id": "u102",
        "fullname": "Shuki Ben David",
        "imgUrl": "@/assets/user-img.png"
    },
    "likedByUsers": [
        "{minimal-user}",
        "{minimal-user}"
    ],
    "songs": [{
            "id": "s1002",
            "title": "The Meters - Cissy Strut",
            "url": "https://www.youtube.com/watch?v=tAGnKpE4NCI&ab_channel=Metallica",
            "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
            "addedBy": "{minimal-user}"
        },
        {
            "id": "123123",
            "title": "The JB's - Pass The Peas",
            "url": "https://www.youtube.com/watch?v=xwtdhWltSIg&ab_channel=remhq",
            "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
            "addedBy": {}
        }
    ]
}, {
    "_id": "NiGlG",
    "name": "Glee",
    "imgUrl": "data:image/jpeg;base64,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",
    "description": "Glee songs",
    "tags": [
        "Cover"
    ],
    "createdAt": 1626446495489,
    "songs": [{
            "id": "9M-eq2dcts8",
            "title": "GLEE - Let It Go (Full Performance) (Official Music Video) HD",
            "imgUrl": "https://i.ytimg.com/vi/9M-eq2dcts8/default.jpg",
            "addedBy": ""
        },
        {
            "id": "1wLk_FHKvnA",
            "title": "Glee - The Edge Of Glory (Lyrics)",
            "imgUrl": "https://i.ytimg.com/vi/1wLk_FHKvnA/default.jpg",
            "addedBy": ""
        },
        {
            "id": "g6ugkDYp-tQ",
            "title": "Telephone - Glee [HD]",
            "imgUrl": "https://i.ytimg.com/vi/g6ugkDYp-tQ/default.jpg",
            "addedBy": ""
        }
    ]
}, {
    "_id": "gcVYP",
    "name": "Eurovision",
    "imgUrl": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUUFBgVFRUZGRQZGRgYGhgYGBgYGBgYGBgZGxkZGBgbIC0kGx0pIBgYJTclKS4wNDQ0GiM5P0c0Pi0yNDABCwsLEA8QHhISHjImJCkyNTIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/AABEIAJ8BPgMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAFAAIDBAYHAf/EAEEQAAIBAwMCBAIHBgUDAwUAAAECAwAEEQUSIQYxIkFRYRNxBxQyQoGRoSNSYrHB0RVygpLwM7LhotLxFyQlY3P/xAAZAQADAQEBAAAAAAAAAAAAAAABAgMABAX/xAAsEQACAgICAQQBAwMFAAAAAAAAAQIRAyESMQQTQVFhIhRxoTKxwQUjUoHw/9oADAMBAAIRAxEAPwDjeKeppwjNSLAaJi/Yagy8HkVoLaGK4GMc/rWWiiPpR/RyUYGleisHemMv+nHQ+EZFCmsyDgjFdCh1BnIBXcPXzqzLoqS84AP61oz+RpY0c6gt3Hb8q0ekW7HiRSB8uK01h0tsbLDK0du0j2bEXxfKq8ybVGbfSxt/Z8H9KDNYODhhWrgtZFPY4PrVpAmfEOanP5OrG7RkpNLQrkiqXxFj8KjnNba808MPBxWcn0wo+SKEMlaYZ4/dGvtstZH121z+yh2s5PrXSbDBt9v8NZUaeAWPrVFk7Jxhszq5csKF3FntJrRJatvOB50Vh0QHxuOBWU6Y0oWiboa2IjO4cDPBqDUbwmQxpwBnJohYamgLRpQ4x/tHOPOtke7ZPErdIt6HkBhWT1GULO2fWtJpUxDuKAXunGS4b0yCaaEqRpr8g3ogAUyEceVZTXtUMkhUHwg1rncCIxr3x+VY6w0oyTHI8IPNZO2bInSNP0RYnBdvmKF9VTlpGQfZH60XTUvhOsSeYwfahfUcPiDeorTg1tgSdAvRl4alZxkyk+hojokAw2amsrXxnb3JqXuUrSCelaaJ5BuHhXv86udS3WxPhRnB9vIVbWYW0RPn/M1lMSSsX9T3NUSJ3bAbzlDhhmi1jY713KPer0OhiQjdR+K0ESbVGfYU0k0hoprbMO1jJvweB50S/wAJiK5OM+9bOy0xZFORg/rQHUtHaNztywpfUQi2zIahdfD8Kr+NUbedweex8q2o6f8AiDLcfzqzFoMMa5fFbkHjWzC3ukPIN4XA9aorp6p9o81sr3VVBMSLkdgayeq2cpbdzg0WhZpdopy3CLwKpyXBPtUxtPWmFAKDJ7K2DXmKndhUOaUATTBq1Ch9KrxKBVyObHahodKy3BbZ8qL2cCr3oIl03lxVqC5Y8HNbQy0bHT7iNSMDmtDb22/DDislpVsU8bflRyy1re2xfzqco1tFk70E5r/Ydp59xVyzt1chsV4tsoG5uTUaOc+HgUExWkFZYgwwBQt9OAfxUUtZvzqS9TevHemptCJ8WC7qHYPD29KoNGr9xRhWwuG/Oh9w6gErUEnZ08rVFpLfEeB2xQlogoyfep7S/JUj0p8+CvPaqO069zQVbfQLtIAzZxxmreoTjYUHfFV9TYxx7k/Kqel3IkXxd6FS439jUuVPoAaXEY7ggnvWpmjCKXPmKE31mVkVl9av9Q3QSFfXFdE4uTSRDFJJSZR0eQNI2POiGoIiZPnj9aZ01ZgIH8zUmsQeZPyqMuS6LxjF038AHTTukIJ70YubNYgSo71X0Kx/abjWg1G23Y9KaUnFpe4qSa30Ze304Ft55Oc1Y1y1BQH0qS+nEa7R3p0Em6PL9sdq6LlkW/8AoE+KdAexi4IA9qOaLpuwl2/CodHZJHwBxmrGt6ht8Eff2qU8csbpmdSWiPVbmMnb5D9TTLG3D/ZGB6mqtnZZ8TnJ9K0mlRAnApFN2TcVFEttpGRmidtaLjBHap9yxjmqb3ozXdcpRoRt1Q/6sqHOaZNIueRmlI4bnNKWQY7VyShxewd9HlxahlyuB/OhEujBgecn3NTvcMPYVBJdn50qlXQ6gzO3ulLGe36VC8ayKRt5960DalG3hcYqhewoPEnb2prY6SRhNR03YTk0HeJQa3Orac0iZU5rE3kRQkEc06JZIJbB9xjPFQ4qRmqMmgyDJBKatQXFVxipYYNxwO9CrDbRfguMkAcn0rU6fbpGu+Tg/pQrS9OEfiPLUatrF5mGfsjy8vxqqxxq2D1JEgleU4XiP19aMWcaxjwjn186t2Wl4ACj+wq79Wii8TMC36VuCYfUaJLCdnGGzVsHZ7D1rO3nUMaHC4oZc6679vOqR8e2D1rRrJNVSM5zk+9S2+vq44rHnQryQblglIPqpX8t2KpwF4ZCjqysOGVgQQe44NV9CDVJ7NGe9mpv9VYbh6UCi10qxU9jUt5LuHvjBrKXRKsRWx+PF3Y0srjVGhl1kqwK/Iij13dFrYMO+K54kpJrY20pMBX5frTZfGjyjIeGZyTTKiayTGVY5OMGh+marsJ+fah89qwdgTgZph2p5808/Hi4tISWd2n8G80W5+M2D2ByM0zrAINoPrQvpu82kfmaXV6GQAg896ljxcciEWSkyymuxxoFU9qF3/Uu9lXPHrWe07RLu5yYIJJAOCwU7cjy3HAz7Zqtd6XPC4SaN4374dSuR6qTww+VVXj41O07Zn5Mmujo+l6nGQoHnRfW7wpFuXvg1leltB3ILm4k+Dag4DH7crfuxr59u/PtnnG0k6g09AEe3dk7bmCufmQWz+Vc+bFBy/FX8lfXbRy9tUYsWbOfekmsM/hJ8IroHVfRULwG6suV27ygJZXTGSyZ5BA52+ePI1zIWoxlTXd4UITevb+DnyZJLRqumrnG/HrVK81MLI2fWrehW5jjbjn/AMVmL6JviMfeqvDCUnsf1JKKDsWsn1wK0ukalgA+vJ+VYCxiLNk9hXVtD0NLrTlZFCzguAw43FXOA/qMYHtivOzYIQab+R4ZG+wVqOrliAD/APFRPqoAGTzWbupyGOeCOCD3BHcVRM5Y13wwLiSllpmzt9WB86ZP1AAcVmDNsXvQ+SUmkyeJGSsP6hrRuItejbg1YDI/2WGfSuavKRzmlFq0iHhq45eKl0NHyWuzbarbnuBz6UEkvXA28/KlbdTAgCT9aJRywTeYDeRFR4JHQpqXTM2uqSRtzyh/SmartkXf5+dGtS0zIOBn3HY1m2iZSVNFr4FarTA8sQ8qrmOrN7bshz5Gq4JqTIssxWm84HetJpWj7efzP9qIaVoQQbn8I9+5olLq0MPoSOw/vW66Dx+Sex0rPL+FPfuaITajBCvcceXmaxGp9TtJnaaz0t0znxMTVEr7JylXRub/AKxzxHwPagdxrMsndjQRFqxCnvV40kQ5W9hPSrKS5lSGMbnY4HoB3LMfJQMkmu2aTolppkQeR0348Uz4BJ9EHl8hyfPNZD6NoRb21xebGkkBESIgLMeFYgYBIBZlyfILVabQ728l+NOshY9gVZVRT91FP2R/w5pZPm+LdJfyNyUVdWay8+km2RtqJI/8WAqn5bjn9K591TrDXNx8coFG1UCg5wqkkbj5nk/pWmfoKQjODn5j+9VV6SkJ2nvnHI8+1Vxxwx2mI8srpxYAeQlQRVS9sWcbgK6/rmkQx2gjVAAu0KcDdnzJPmSM5oVZ6cH098DxRu7KfPAC7h+X8hQj5EWr+6LS5fBzC2sMEbvUUee7SMbeOa1fSvTttLl5TvkDHEZbAVRjDbRy3fueKN3Oq2Vv4ViBIJXCRL3HB5OBQyeSk+K2PhjJro4jrVy2/jsaGQqWbny5rr/U+n2l/ZXFzHEYpbdXYOVVNxRN5VtpIYEcc8gkfjW+jLo2MxC7uEDF+Y0YZUKOzsp7k+Wew58+CvIjxtiyh+WzEaVNh8A1sOlNI+uTt8T/AKEYUt5bmOcKD+BJ9vnVjr6yUyxSwogiKshePbhnRiCrYGMrggf6vSi3SwMOkzSqMOwuJPfcoZF/7BSzytw5Lt6M1sx/XXWk6v8ABs3+DbJ4QYwFZyvGQw+ynoFx6nvgedI9Qm7zZ6k4khkBKSOVV4nUZGJPcA4J5zgcg4oP/hjSoPCe3p6UIudPdTtwadQhVLv+f3Fdrb6DOva4bq4yvht4zsgQcKsa8AgerYBJ+Q8qWszYRT8qDJCy+RojqykxflVq4pJC32zqH0TXTPaOjHIjlYL7Kyq+P9zMfxrkuqW/wbyaFeESaRVHkEDnaB8lwK7D9GFiYdPV34MrNMc+SkBUPy2qG/1UD6A01bx9QnlUNHPLtXcBkDLvx6EB0/KoYMyxznL2/wA2NJckkAtKnLDZ6mm3ujlmOAO/ka0nRPTe5neX7KNsAHG5h3yfIDj863KPbJwoQY/dXP6gVsnlcZPirHhJo5TbaGyr9mt70rdxwWqxudpUsTkHnc5bIx374/Cq92+6ZtiYTjHGMnHJx5c0T1bThNbA4CyBAwIGOQMkH2PNc05OclydWWfkKUXHj18HIepYS80kijCu7uB7MxI/nQyCMjk1vrXpWSaRRuwAQzMeQAD6efyra6to9sI5ZPqiSPtJ2hF3OVHAHofcc13PyliqHZz2pO6o4JcTZPtUG/1q29m3fGP5D866h0N0ZGLRpJVBmuI2CsVDfCjdSF2g/eIO4n3A8qvl8iOONsnw5PRxiaSqrvXd/wD6U2Bj25m34x8T4niz67cbfwxXH+q+nXsLhoHO7gMjAYDo2QGx5HIII9RXK/IjO0jem12BGHvUkM7IcqxqNqaWrnbKpGisOpGXAftRzfFOAcgP5GufFqfFdOh8JxU2zojkrs2eo6RmMnGR5/3rFXEJRiK1ejdTdlk+XPY0Vm0SG48asBnnFK9djSSmtGa1HqV5OFP40DaQscscmoRT1SgmQ7JVx604bahwKniApkwNHisc8ZqaOVqtQQZ8qI21go5NXg/kjNL2DvRXUt5b/sLdEcSOCEZSTvIA8JDDGQBnPHFdrhuWihD3TxhsZYqNqAn7oyST/Wue9AJDb28+oS4Ece5VOPQDcV9WYsqD3yPOsJ1B1hPeyl3O2PJ+GgPhRf6t6t5/LApXjWSdLSXbMpOKtnZZesIycR8+7cZ+QqC0vC8ynPdhn881xOK9deQa6H03JMkcFzL4Y3njjUNkM6sTlwPJeOPXv2xkz8dRVpnNLFlyST5e/XR0fVVDAKe3J/LgfzNP0+2VYSo+y27P48Gg3U9+0c0UaqSZBhcD7TBuR+AINEdWm+r2jc8hNoP8TeEH8zmuXg9fZ6UIyer7ehuj6aiMzrgkjb7gZz/QUPuun4QxeWXgkttGATk59yfwFR9HXrtDM7nOxv0C7v60QtrlL2DcuBIvBHmj47H+E/8AORWnjcW18FZvJCTp2/kzvUs3xoxaQLsicqpOMFgWHHyJ5OeTRfrXU/qOnuYvC21YYsfdLDaCP8qgn/TVSxuEdgGG10cBlPcFW5/lU30hacZ7dABna+7/ANLAH9f1rRbTSl1YJx5UkqZk/o1cSwS2j8hgZUz91gRnHzyD+frW26ZKTWbRr2zIhHoWyef91Y36PtJdL3ODsjjbPzbCqP8AuP8Apqt071Wlrf3EbH9g88isf3SJGCt8hyD7H2royLk3x+mc7XFpP9g5DcRx5QrhuQR6EdxVG5+ESWKijvWGkO6/WbcbzjLqvJdccOmPtHHkO47e/PDrG9CMD0rY97Qs5PpkurXMODtAzVzpXQDfOoYfsEwXPqO4Qe5/QZ9qC9P9PyX0+xeEHLueyL/UnyHn+ddiHwrKERRADaOPM582Y+ZNUnlaXGPZD8V+UtJEXVFwFhMK4Xcu1scBUxjA+Y4x6VJ03ZraWa548LSt828XPyGB+FZJrpp5UTBO91VmPozAH+dbDqg5gMSnBkIXj90ct+nH41yZWscak6XbK4W8r5JfsQ9PTIsRBIAYlifdhzmrxs8/YKH8f7ZrPWFgVAXOfICi1poa7t79xyAP6n+lcy8mM3+G/wCx0+i4r8tEN38RDgoOexHINF7slYG/e2Y/EjH8zUU18jMqjB8QGfLJOOPWqnVOpLEgUnBYk/gv/kirc0wKDukWdDt/hxbmPibLMT6Dt+GB+tZeXqILdCVnwmdu3/8AXn09fvfOjF7qGdMeaPnEDHjn7KkN+WDXCb/V3lO1c5PAA7kngAe9dOHE8lsVtRWzonXGmpFcAIABNhk9Ms2GA/Eg/wCoVqfpFnaDS5RESrYjjUqcEKXRWAI/h3Cs/wDSJHs/woMf2iyxqfUjMIf9Qv50S+li4xbRRg8vMP8AaiMT+pWtyvhf/qAt2jFfRBdyLfGPc3w3icsuTtLKVKtj1+1z71a+nH/r23HPw5M/LcuP6036PLdo7+JjjDK6/mhI/wC2m/TVKfrcS47QA/7nf/2ii2nluPwHi4qmczeQelQNJUkr+1V2ajJAs8MlNZq9JptSYRA0RtNWlQYB4oeq04VrCkRg1IqE05FFSiTHalSEbZJDaetX41RfnQ8Oxpyq1MpJdG4N9hpHGM1Rub5icDn5VCgduPKrK7EHvWTd7KcVWtG+6ftHvtCktYebiKbeUyAXUv8AEHf1y2M+aVkbfozUJH2LZyg5xll2KP8AU+B+tUNK124tZhLbuUccHjKuvmrqeGX/AIMGui230sXOzx20W7H2gzhfnt5x+dOnOHRNxUgp0l9Gaw4lvWV2HiES/wDSXHOXY4349OB86zn0hdVLdzLHC37CHIDDs7ngsv8ACAMA/M9iKA9R9bXl7mN3CxHvHGCiN/mOSzfInHtQGJyODV8UW5cpu37fRNyS1E7/ANN9aW1xArSypHMq+NXYL4gOWUnup78ds4rGdZ9ZrcyBICTAmfF23t23AfujsPXJPpWDtn4ryM4JHkearDxYxlyHWRo6HofUKJp867h8Z5CipnxbSibmI9Mbhn1qlonUhgnDr2ICunky/wBx3B/uaxljLtcg9quxqC5YU3pRt/YyzP3Ora/BHMi3cDZDYVyvf0BYeRHY/hRPR9YSSMRzkBgACW4VsdjnyNcSGpSRuQkjKjDDBWIVv8wBwfxq/F1IykA88Un6VONN/sHP5PHGlFW7OtarrlvaRssJVpGztCndhsYDMfQelcavdLZMuOc5JPmSeST71Lda9vbtirFnrQfwMAaSOHh1s5fW5f1Ki10j1xNZ4RwZLfP2CcMn/wDMnt/lPHyrYanoNtqS/WrJgsp5dCNu8+e9fuv/ABdj796xdxoYJD+RIrV2E62iq6HDD9R5g+oqGWo/lHsbHJylxNIAljEtvABvxl3x94jlj6sfIeQxQ+WYBSWOTznJofa6j8VmOeSSST5knmhV1PhyGPGfM15ss2Ruo6/uehD/AE+Enynuul7CXWQk6MB4UdGY/wAIcZ/TNaHVNW+PdFYzvRQqqVOVZjySCO/Jx+FZaG6hyQduc1YXU4ozlTyOeOMHywaHkR5Y+DTdnRgx/lcaSR0WGSO3XDHdLjkDk/L2H86C6rrpbIZgifug9/mfOuf33VrZYL3/AOedZ6XVJJCSzHmmw/6fmyJLUI/HuJkyYoO2+TNxJ1XGkqEZKq6s2PQMM4HyzQ36SeoRNclYnBiRFUMpyrEjexBH+YD/AE1ijPjJqq8mTXt+P4OLCr7/AHODL5Esj+Do30edcxwI1pdn9ixJRyNyru+2jgfcJJOfLJzx2OWmk6HaSfWxco2070QzLIqHuCka+JiPLOccelcZ5HvUkaFzwK08Scm4tq+6JptLZr+sOpDfXSzICscWBEp78MGLt6Fiq8eQUUR+lXX1uJYRC4ZI492QQRvkwSOPMKq/maxaaa59PzplxpkoGc8VN4kmvofkibTep5YJY5BzsdWx+8FYFl/EZH41ofpY1aOe6gmhdXje2Qgg8jxyZDD7rc9jWLjsmY47U5tJf2qbgk7WjObfZD8QGmtEDXs1oyd6hVzWlJe4Vsa0VIoBUhmqq8hqEpL2KKkSAU/IqKNqeRS3Y6kkISVNC4zVQU5HxQsmjTWNorDmjVtpMfdv51io9RdexNWV1hsdz+dNGh3P4NobCAcY/Wq7aPCTn+tZL/EyPX86kj1Vj2BNWjKKIyuRroNHgB7frVi40+EjAGB86xR1gjuDXn+Nn3/On5x7FppUdO0LpW2Nu1w0MtwQ+z4UT7WUAZLEAgk+3yrOpokd1qItbZZI4z9ozKN6BV3PleOx8IB9s03pbqCzVD8W5ura4DE/Ei8UbL5IVAJOOTyPP8Ksap9Iif4ml5AjNGiLE24BXmUb97kD7JO4Y/yDOOwTm+To3HQTs7TSZ5vqcaXCyElEuWYMruO2UzjaSP3Rn2zS6W6SjlmuobklTCpAdW2gEMy7/cYAODVe31/RoJfrkbXDuCXS2KBQjntlsYwCf3jj34oZonW6f/kHnJElzC4RVUsPiPvwufuqNyjJo+rKmk2Hj8hWHpD4UV/8dSZrdYzEykhWDFvGB94EKO/bkVJpmjW9vapcXiySPOxWGCI7SQDjcSCCSeOAfvDg54ZafSCkmnTW8wP1jYEjcKW3oDlQzDsV55PfI881R07qu0nto7a9eWCW3cvDcRDdgZyFZcE5Bx5fdByPPPJLt/Pt+weK9iDqiwjR0aGG5hR15S5RlIfPIQsMkAYycnvXnSvT63czK7lYo0aSRhjcFXyGfM+voDUfXPV0VytvDA80og37p5sB5C23sBzgY8wP61Q6N6r+pzs0qF4JEaKVRjcVOOVyQCRjtkZBNVWf/b+xeCsN6o2ltE/wIriOZcfDZm3LJz94FjtGOeMf0o7o/T1stnbztaTzyShi3wWbwlWIBK5wAf6VldWn0lInNvLcyzNj4asoRIuc+MlRuGOPP8O4PaV1dZmxtoZLy5t5Yg274CNhizEgMQMEAfzNLLKqXFvv7+BeFvZp7CCK4nMJjdEVCdjEh1ZQv2iPnWR1OcmMc84paH1bbQag0jTTSWxiZfiujGRpG2ZyoGfI80N1u8sRFm1uLiSXIG2SPau37x3bRz2pITSfyTnhbkpdUb3UtMgtZAqWN5KNisXiYsnOcjJPcY/WhPTlhDcxXEzxSybHXYiMfiFWJ44PJAwfwNSax1NZXLiRdQvoRsVSkSOqcZycbe5z+lC+lNbt4YbqGSaaISOvw5I1beEVjhsqPCSMZHuajdL7OuN+wzq7QooI4poVkieQPm3mILKE7N6gH39R25o5qOh6dHdR2hguS8gXEiOSqls8kE+WOeCKzvVvUUUloltA9xcOsjP9YuAAygqw2KT4iOR3Hl5+Ry4+kofXQFZ209ogj4QpJHId2ZE43nHhGPfI5FFy6DuqMfL0+TfNZo+5vjGIN57QeWI9lBJ/ymivWvTEEISW0YmBy8TZZn2zRuytyfXDcfwH1of0xq8VjNdXG95pQrLa70fxs5JMkucbTjGcnJy+KvDrJLq0uLW5gjt9yh4DbxMF+OCT4wM4zhRu9M5qz8huSrpfyLwLvTOg6ZcRPvgmMkMPxJGEpCuyjxbAG4yfXFU+n+nbK81DYkciWvwWbY7ndvXHi3Kx457ZoZ0hrqWq3YmZgZbZo49qlvGwOAcdh25NRdAdRx2l58W4ZhH8J0yqljubbjgc+Rp+TqXf0LoudL9OwvBJeXbt9Wi2rsjwGkkYLhN3kPEvbH2u4xRJ9Hsri2mnsVeKS3Xe8UjbwycksrEkg4VvPyxjkGs/0j1LCkE1leq5tZirB48F4pFCgMAe48Cnz+z2OTRSfV7O1tZ7eweWaW5UJJPKuwLHyCqrgEkhm8vvZzwBSucuWr/xQK0HbHpgT6Yk0J/+6PxG25yJFSRlKqp7NgL28/nQbqSFIbOykGQ86O0mcnJUpjCn7P2jVc9QtHY2McEjC7tppXbKnbtdpCBnswIcAj0JqL6S+qIr2O1MSlJEWUyptIVWf4ZIBxhhlWOR+NJKc1v2tmUUZg3ODkNSXVWHmPyoHvPqaQJJqaytsbii7eXzPTbbHnUTIMV4hpJxbGi6Y66AzxVY1Kzioiamgt27EKl3molNO3U66FYzNLNOKGkVI8qUI3NWIYs1Xp6uRRRi7IgxV3T5UT7QzQdZTmrQnBxVGoyVDQk4ytFnUIgxyooesLZxRKOYY5rx3BOQK6sXjwktyo2VPui9F0wxj+JmgM6bWI9KPLq8uzZk49KEyW5YknvXPwlyo0oxpcXZTpVObU1G0ZHenlinHbRNpo8SQimlq9xTWqbtBJ4JQversd2nmKE5pZp4ZnH2FcUw6LqI+VWBNFjsKzYavd5qnrQf9SAoV0auWWEpwKZ8SLaPWs18U+tIOapGeBapmlG2bSxUOvhQmpbi5jjG1lwa96Q6gihUiRcnFBOq9VSaTMYwM1pxwvbX8jwm49Est0hziprPUY07jNZpZMioixppPBxSoZTado2KaxCDyop0msQHsAPwrFb683Vzyjgbuv5HWea0H7m5jY5GKrM6e1CgTTip966YeVCKpRIyXJ2y/vSpBdAdqEZr0ZND9ZH/AIoXgGBfj1qpeXIcVSwa9IxST8hSi1xQVGiIivRTmFMFcLVMcmJqMtSU164pnK+gDCaVKvQKmlYTylmnYrwim4urMWjcCo5Jc+VQk0s1tGERXorzNLNCzDsUgKZTgaJkSbjVm3lx3qqrVITxQSaei0ZJ9lw3IJp6y80JLGlvNXhn4u6JJ07QXZx3qJnDUP8AimvA5q8/OclTRm2y78AHtXj2uO9P018HmrF84J4qeOPqOnoVqlYLaOmbTVhzT4wD3pn465UmaOyoFpYqV15r1FpFhbdAbI9tErEJjxVUmQcV6U44p3icW/oJckgXPBqtLa+9QeKnLu9aaWTl7A0PW296vW1kMc0Oy3rV23uyBg0I5En0MmiCe1APeovq49aVy5J71Bz60kpL2iYtRRgHNEx8Nlx50CwfWvQ5HnSOX0Bl2S3A7VV+yakS79a8kkDUXOLRhCYGk4BqHAp5cUqn8hSsZKtRAVYJBpjJilmo3pmISKWac9Nqb09GFSpUqUx6DSJrylTcnVGFSpUqUwqVKlWMIUqVKiY9pwavBXhNN0YdmlmmUqFgHV6KZUiCnjthJFbArxpzSHNMcUJTt66H460e/Fr0SVEBU2ziipS+SYwyV6Jaay0yl5S+TUSmWkJjUVKtzl8hJPjGl8U1HSocmYeJDS3mvFFP20VbQBKc040xODVnGRXRjl+NAaIN1NY16wqPNLPJqjUeGlSpVzDCpUqVYw8PXhY02lWMKlSpVjCpUqVYwqVKlWMf/9k=",
    "description": "Some Eurovision songs",
    "tags": [
        "Classic"
    ],
    "createdAt": 1626446613222,
    "songs": [{
            "id": "u7-SqFd3gTE",
            "title": "Netta - Toy (Lyrics) Israel",
            "imgUrl": "https://i.ytimg.com/vi/u7-SqFd3gTE/default.jpg",
            "addedBy": ""
        },
        {
            "id": "2DaRhiCKGMk",
            "title": "Alexander Rybak - Fairytale",
            "imgUrl": "https://i.ytimg.com/vi/2DaRhiCKGMk/default.jpg",
            "addedBy": ""
        },
        {
            "id": "gHgxi57Um0w",
            "title": "Sergey Lazarev - You Are The Only One (Russia) 2016 Eurovision Song Contest",
            "imgUrl": "https://i.ytimg.com/vi/gHgxi57Um0w/default.jpg",
            "addedBy": ""
        },
        {
            "id": "Fv83u7-mNWQ",
            "title": "Israel - Dana International - Diva (live) - Eurovision 1998",
            "imgUrl": "https://i.ytimg.com/vi/Fv83u7-mNWQ/default.jpg",
            "addedBy": ""
        }
    ]
}, {
    "_id": "dbrsB",
    "name": "Israel Music",
    "imgUrl": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQcAAAC/CAMAAADEm+k5AAAAhFBMVEX///8AOLgAG7MAMbf2+P1Yb8gAHrPq7PcAJrS/xeYAKbUANbcALbYAL7b7/P4AJLTd4vMAF7IYQ7tEYMPGzerv8Pi4weZNZ8UANLiOndiirt51iNCyvONxhM+ttuEvUb/i5/Vcc8nS2O+ElNWVo9ogSLxnfMxAXcKcqdx/kNMAAK4HPLq9nvkNAAADtklEQVR4nO3d227iMBSF4RAYjoFACy3QMz3R6fu/3zRedmAqKEiUbEj+76JqJC7MUmJvO06IIgAAAAAAABSigUwUIxPVkCEHIQchByEHIQchByEHIQchByEHIQchByEHIQchByEHIQchByEHIQchByEHIQchByEHIQeJ6shEf5Cx3nYAAMC+5tYNOA2LvwvrJpyEh/6DdRNOwX1aS2+tG2Fv0O/Vev2BdTPMPSdfs73k2boZ1lojN+0dtawbYuxP3eVQr/iEbxz7dZB4bN0UUxc9n0PvwroplubtfGGsXeGqstFdWyHsNqybY+YmUSfp/iY31s2xMlQn2b3TaREPrRtk5NKdCPXL1T+V1GmqhBqGE6PZsW6Sic9e3i2oo+h9WjfJwkt3NUz4gaP7Yt2o4k10VaQqG+aproyJcauK99Z3l8KrP3x1F0n/zbRNR9RobTbW6dC9nbjDya2ujOZ4y+fPvcgaxHFzkzRUkf44VJbpxk/Ho7NfqLlq7nnn/SfNK+uvcbj36cExTN+tv8QvGI4OzmFUior7LjkwhuTO+iv8ikZYZOi2Jfl2HIS+Mvl2nJ77YOEtFURy33HGzwoi9ce5ew0iyWzsj/W59tL6C/wWrb71wwLDg+s5N9RMqq2m4fbWjUqt8qzY+aLJLzBsr6H/r7V9B9ss0QrutVtg0PA3+GFOFeZermrSgFu/LrSlx/WoBYY0K4f8HLu28YO11Vz8SqdN/FhkQ4/tQ19+mi/GbakQO6sraKpIPgpu6XGFi2EW1uC2VYj5Et1s/RIpjzAm+k5ya4XoO8d0HsbWQltZAA2WtWRXheirT/2dlm+HyCLcyXSl0fYKsdFe+1xcwh1DT/VVDD9ViMtVEPWnwlpXnFa+ELGjQszv/daapdwVMQvzph0V4jgE9jW6lJKKpN17PvzekC2l1vlb+rFwV+e38GNsaeaZ33A+OPQPDuOF7Fs/zMtdP1BPCvMLh/mms/f6w3u51x9W61GPVV6PYn1SWK92uH8h3M9yuL/pcL9b2P/gsB9G2B/lsF/OGYzYP5lhP+0OFdtfvRX77T2ev/B4HkfWns/yM8tqPp/F83oez296PM8rPN/tzdM8hrTCz/vz/oeA94F4vB9GeF+Qx/ujhPeJebxfzuN9g8L7J71KV5IAgPNi/cMTJ4LfQxF+H0fIQchByEHIQchByEHIQchByEHIQchByEHIQchByEHIQchByEHIQchByEHIQchByEHIQchBohiZqIGM9bYDAAAAAACAqvgHDuyN18xrS4AAAAAASUVORK5CYII=",
    "description": "Some israeli songs",
    "tags": [
        "Israeli"
    ],
    "createdAt": 1626446811820,
    "songs": [{
            "id": "Bx7oaO6hP_s",
            "title": "להקת הנחל - קרנבל בנחל",
            "imgUrl": "https://i.ytimg.com/vi/Bx7oaO6hP_s/default.jpg",
            "addedBy": ""
        },
        {
            "id": "nMQw29nfzpg",
            "title": "Omer Adam feat. Arisa - Tel Aviv עומר אדם עם אריסה - תל אביב",
            "imgUrl": "https://i.ytimg.com/vi/nMQw29nfzpg/default.jpg",
            "addedBy": ""
        },
        {
            "id": "8znN_y--WfI",
            "title": "סטטיק ובן אל - סלסולים (Prod. by K.K. Slider)",
            "imgUrl": "https://i.ytimg.com/vi/8znN_y--WfI/default.jpg",
            "addedBy": ""
        },
        {
            "id": "D3l8vnfbnPs",
            "title": "אילנית ארץ ארץ Ilanit",
            "imgUrl": "https://i.ytimg.com/vi/D3l8vnfbnPs/default.jpg",
            "addedBy": ""
        },
        {
            "id": "WvnWZJLRK2Q",
            "title": "יהורם גאון - ארץ ארץ",
            "imgUrl": "https://i.ytimg.com/vi/WvnWZJLRK2Q/default.jpg",
            "addedBy": ""
        }
    ]
}]
export const stationService = {
    query,
    getById,
    remove,
    save,
    getEmptyStation,
    saveSong,
    saveSongList
}

// const STATION_URL = 'http://127.0.0.1:3030/api/station/'

async function query() {
    // console.log(sortBy, filterBy);
    let stations = await storageService.query(STATION_KEY)
    if (!stations || !stations.length) {
        stations = gStations
        storageService.postMany(STATION_KEY, stations)
    }
    return stations

    // return axios.get(STATION_URL, { params: { filterBy, sortBy } }).then(res => res.data)
    // return httpService.get(`station`, { filterBy, sortBy })
}

async function getById(stationId) {
    const station = await storageService.get(STATION_KEY, stationId)
    console.log('station', station)
    return station
        // return axios.get(`${STATION_URL}${stationId}`).then(res => res.data)
        // return httpService.get(`station/${stationId}`)
}

function remove(stationId) {
    // console.log(axios.delete(`${STATION_URL}${stationId}`));
    // return axios.delete(`${STATION_URL}${stationId}`).then(res => {
    //     res.data
    // })
    // return httpService.delete(`station/${stationId}`)
    return storageService.delete(STATION_KEY, stationId)

}

async function save(station) {
    if (station._id) {
        const updatedStation = await storageService.put(STATION_KEY, station)
        return updatedStation
    }
    if (!station.imgUrl) {
        station.imgUrl = 'https://is4-ssl.mzstatic.com/image/thumb/Purple124/v4/6a/e4/59/6ae45956-8b3d-0ff2-81f8-587c7c65b515/source/256x256bb.jpg';
    }
    const addedStation = await storageService.post(STATION_KEY, station)
    return addedStation
        // station = JSON.parse(JSON.stringify(station))
        //     // return axios[method](STATION_URL, station).then(res => res.data)
        // if (!station._id) {
        //     console.log('post');
        //     return await httpService.post(`station`, station)
        // } else {
        //     return await httpService.put(`station/${station._id}`, station)
        // user = await httpService[method](`station/${station._id}`, station)
        // Handle case in which admin updates other station's details
        // if (getLoggedinUser()._id === station._id) _saveLocalUser(station)
        // }
}

function getEmptyStation() {
    const station = {
        _id: '',
        name: '',
        imgUrl: '',
        description: '',
        tags: [],
        createdAt: Date.now(),
        // createdBy: {},
        // likedByUsers: [],
        songs: []
    }
    return station
}

async function saveSong(song, stationId) {
    const station = await getById(stationId)
    station.songs.push({
        id: song.id.videoId,
        title: song.snippet.title,
        imgUrl: song.snippet.thumbnails.default.url,
        addedBy: ''
            // url: ,

    })
    const updatedStation = await save(station)
    return updatedStation
}
// async function removeSong(song, stationId) {
//     const station = await getById(stationId)
//     station.songs.push({
//         id: song.id.videoId,
//         title: song.snippet.title,
//         imgUrl: song.snippet.thumbnail.default,
//         addedBy: ''
//             // url: ,

//     })
// }

async function saveSongList(list, stationId) {
    const station = await getById(stationId)
    station.songs = [...list]
    const updatedStation = await save(station)
    return updatedStation.songs
}