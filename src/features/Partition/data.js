export const root = {
  userName: "Partion-Root",
  isVertical: true,
  isHorizontal: false,
  childrens: [
    {
      userName: "Sub-Root-01",
      isVertical: false,
      isHorizontal: true,
      childrens: [
        {
          userName: "Sub-Root-02",
          isVertical: true,
          isHorizontal: false,
          childrens: [
            {
              userName: "PT-01",
              isVertical: true,
              isHorizontal: false,
              childrens: [],
            },

            {
              userName: "PT-04",
              isVertical: true,
              isHorizontal: false,
              childrens: [],
            },
          ],
        },

        {
          userName: "PT-03",
          isVertical: false,
          isHorizontal: true,
          childrens: [],
        },
      ],
    },
    {
      userName: "Sub-Root-03",
      isVertical: true,
      isHorizontal: false,
      childrens: [
        {
          userName: "PT-11",
          isVertical: true,
          isHorizontal: false,
          childrens: [],
        },

        {
          userName: "PT-12",
          isVertical: true,
          isHorizontal: false,
          childrens: [],
        },
      ],
    },
  ],
};

// whenever a new node is about to add, before that add we check if the parent node has any children already. If yes, then we simply push that new node to the childrens array. If not then we transform that parent node to a sub tree and change the userName to sub-root, then add the new node in the childrens array (It's like saying, hey now you have become a parent, so now you no longer have to stay in the UI rather let your childrens take that place for you).

/** 
 * Right now it is in the UI. when user clicked happens in this node then it become parents.
    {
        userName: "PT-12",
        isVertical: true,
        isHorizontal: false,
        childrens: [],
    }

    Now It's transform To, 

    {
        userName: "Sub-Root-01",
        isVertical: true,
        isHorizontal: false,
        childrens: [
            {
                userName: "PT-12",
                isVertical: true,
                isHorizontal: false,
                childrens: [],
            },
  ],
}

*/
