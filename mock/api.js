import mockjs from 'mockjs';


function fakeChapterList() {
  return mockjs.mock({
    'list|50': [{label: '@ctitle', 'parentId|1-2': 1, 'value|+1': 3}],
  });
}

/**
 * 生成试题
 * @param count 试题数量
 */
function fakeQuestions() {
  mockjs.mock({
    'list|100': [{
      id: '@integer(0,100)',
      description: '@ctitle(40)',
      'options': ['@ctitle(10)', '@ctitle(20)', '@ctitle(13)', '@ctitle(18)'],
      'answers': ['@pick(0,1,2,3)'],
      'chapterID|1-2': 1,
      'sectionID|+1': 3,
    }],
  });
}

function getMockData(busiNo) {
  let resultData = {};
  switch (busiNo) {
    case "600028": {
      resultData = {
        authId: "AUTH0000001",
        token: "t7w8t768tw6t8wtwtt",
        userId: "UC0000000001",
        telephone: "18214990001",
        clientName: "张大炮",
        headImg: "demoData",
        realnameFlag: "NO",
        certificateResourceId: "RES00000001",
        certificateKind: "RESIDENT_IDENTITY_CARD",
        certificateNo: "360782198708242017",
        faceIdentifyFlag: "NO",
        hasSetTradePwd: "NO"
      };
      break;
    }
    default: {
      break;
    }

  }
  return resultData;
}

function buildResp(req, res) {

  let responseData =
    {
      success: false,
      errCode: "500",
      errMsg: "请求参数为空",
      data: null
    };
  const params = req.query.busiNo;
  if (null === params) {
    return res.json(responseData);
  }
  let mockData = getMockData(params);
  responseData.success = true;
  responseData.errCode = "";
  responseData.errMsg = "";
  responseData.data = mockData;
  return res.json(responseData);
}


export default {
  'GET /api/app/dojson.json': buildResp,
};
