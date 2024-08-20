const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

let step = 1;

window.handleInc = function () {
  if (step === messages.length) step = 1;
  else step += 1;
  const app = App();
  document.getElementById("root").innerHTML = "";
  document.getElementById("root").appendChild(app);
};

window.handleDec = function () {
  if (step === 1) step = messages.length;
  else step -= 1;
  const app = App();
  document.getElementById("root").innerHTML = "";
  document.getElementById("root").appendChild(app);
};

export default function App() {
  const UIDescription = {
    type: "div",
    props: { class: "container" },
    children: [
      {
        type: "div",
        props: { class: "steps" },
        children: [
          {
            type: "p",
            props: null,
            children: `Step ${step}: ${messages[step - 1]}`,
          },

          {
            type: "div",
            props: { class: "buttons" },
            children: [
              {
                type: "button",
                props: {
                  style: { "background-color": "#7950f2", color: "#fff" },
                  onclick: "handleDec()",
                },
                children: "Previous",
              },

              {
                type: "button",
                props: {
                  style: { "background-color": "#7950f2", color: "#fff" },
                  //   designer: {
                  //     firstName: "raju",
                  //     author: { published: 2010, isbn: 981 },
                  //   },
                  onclick: "handleInc()",
                },
                children: "Next",
              },
            ],
          },
        ],
      },
    ],
  };

  return render(UIDescription);
}

function render(UIDescription, domElement) {
  const rootElement = createElement(UIDescription);
  return rootElement;
}

// ({
//   style: { "background-color": "#7950f2", color: "#fff" },
//   designer: {
//     firstName: "raju",
//     author: { published: 2010, isbn: 981 },
//   },
//   onclick: "handleInc()",
// });

function setProps(props, element) {
  let arr = [];
  for (let key in props) {
    if (typeof props[key] === "object") {
      arr.push(`${setProps(props[key], element)}`);

      for (let k in props[key]) {
        element.removeAttribute(k);
      }

      element.setAttribute(key, arr.join(""));
    } else {
      arr.push(`${key}:${props[key]}`);
      element.setAttribute(key, props[key]);
    }
  }
  return arr.join(";");
}

// style="backgroundcolor="#7950f2"

function createElement(UIDescription) {
  const element = document.createElement(UIDescription.type);

  setProps(UIDescription.props, element);

  if (!Array.isArray(UIDescription.children)) {
    element.textContent = UIDescription.children;
    return element;
  }

  let childrens = [];

  for (let children of UIDescription.children) {
    childrens.push(createElement(children));
  }

  childrens.forEach((children) => {
    element.appendChild(children);
  });

  return element;
}
