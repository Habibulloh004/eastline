"use client";
import { useEffect } from "react";

export default function ChatBot() {
  useEffect(() => {
    (function (a, m1, o, c, r, m2) {
      a[m2] = {
        id: "413126",
        hash: "a41b728aa658401aa52ee005b83d9ec15b0bce3002e394f179251d00b5c88620",
        locale: "ru",
        inline: false,
        setMeta: function (p) {
          this.params = (this.params || []).concat([p]);
        },
      };
      a[o] = function () {
        (a[o].q = a[o].q || []).push(arguments);
      };
      var d = a.document,
        s = d.createElement("script");
      s.async = true;
      s.id = m2 + "_script";
      s.src = "https://gso.amocrm.ru/js/button.js";
      d.head && d.head.appendChild(s);
    })(window, 0, "amoSocialButton", 0, 0, "amo_social_button");
  }, []);

  return <></>;
}
