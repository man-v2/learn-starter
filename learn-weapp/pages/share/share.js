// pages/share/share.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFinished: false,
    systemInfo: {},
    bgImg: "../../images/banner.jpg",   // 背景图片
    dataImg: "../../images/content.png", //内容缩略图
    ewrImg: "../../images/qr-app.jpg", //小程序二维码图片
    imgalist: [
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496287851&di=0a26048f586b852193cb5026d60c4fad&imgtype=jpg&er=1&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F12%2F74%2F05%2F99C58PICYck.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1495693185413&di=0d0acdebf0f532edd0fcdb76265623c5 & imgtype=0 & src=http % 3A % 2F % 2Fimg1.3lian.com % 2Fimg013 % 2Fv3 % 2F2 % 2Fd % 2F61.jpg'
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this
    wx.getSystemInfo({
      success: res => {
        that.data.systemInfo = res
      },
    })
  },

  /** 
   * 预览图片
   */
  previewImage: function(e) {
    var current = e.target.dataset.src;
    var index = e.currentTarget.dataset.index;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: this.data.imgalist, // 需要预览的图片http链接列表
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  share: function(){
    console.log('systemInfo', this.data.systemInfo)
    // this.downloadImages()
    this.convas(this.data.bgImg, this.data.dataImg, this.data.ewrImg);
  },

  downloadImages: function () {
    debugger
    let that = this;
    wx.downloadFile({ //背景图
      url: that.data.bgImg,
      success: function (res) {
        wx.downloadFile({ //内容缩略图
          url: that.data.dataImg,
          success: function (res1) {
            wx.downloadFile({
              url: that.data.ewrImg,
              success: function (res2) { //  小程序二维码图
                console.log(res.tempFilePath, res1.tempFilePath, res2.tempFilePath);
                that.convas(res.tempFilePath, res1.tempFilePath, res2.tempFilePath);
              },
              fail: function () { }
            });
          }
        });
      }
    })
  },

  convas: function (bgImg, dataImg, ewrImg) {
    // debugger
    let that = this;
    let fontSize = 10;
    var ctx = wx.createCanvasContext('myCanvas');
    var scWidth = that.data.systemInfo.windowWidth;
    var scHeight = that.data.systemInfo.windowHeight;
    var defaultHeight = 0.05 * that.data.systemInfo.screenHeight;

    //第一步：刻画背景图
    ctx.drawImage(bgImg, 0, 0, scWidth, 50);

    //第二步：刻画背景色
    // ctx.setFillStyle('white');
    // ctx.fillRect(0, 0, scWidth, scHeight-190);

    //第三步：刻画内容缩略图
    var imgHeight = 0;
    // ctx.drawImage(dataImg, 20, 30, scWidth - 40, imgHeight);

    //第三步：刻画标题
    // ctx.setFontSize(1.3 * fontSize);
    // ctx.setFillStyle('#333333');
    // ctx.setTextAlign('center');
    // ctx.fillText("食物美容，远离肌肤衰老", (scWidth) / 2, 63 + defaultHeight);

    //第四步：刻画内容;(备注：canvas好像没有自动换行，有需要此步骤的同学，可根据canvas宽度，设置文字个数)
    // ctx.setFontSize(1.1 * fontSize)
    // ctx.setFillStyle('#333333');
    // ctx.setTextAlign('left');
    // ctx.fillText("简介：岁月如刀，刀刀催人老，到我们25", 35, imgHeight + 100 + defaultHeight);
    // ctx.fillText("岁的时候，皮肤就开始进入衰老期，皱纹", 35, imgHeight + 125 + defaultHeight);
    // ctx.fillText("、色斑。皮肤松弛等现象逐渐出现，这时", 35, imgHeight + 150 + defaultHeight);
    // ctx.fillText("，抗衰老工程也正式展开。", 35, imgHeight + 175 + defaultHeight);

    //  第五步：刻画小程序码
    ctx.drawImage(ewrImg, 35, 200, 120, 120);

    //第六步：提示用户，长按图片下载或分享
    ctx.setFontSize(0.050 * scWidth)
    ctx.setFillStyle('#333333')
    ctx.fillText('长按码查看详情', 165, imgHeight + 250 + defaultHeight);
    ctx.fillText('小程序名字', 165, imgHeight + 280 + defaultHeight);

    //第七步将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中
    ctx.draw(false, function (e) {
      //第八步：生成图片并预览
      that.imageGeneratePreview();
    });
  },

  imageGeneratePreview: function() {
    // debugger
    let that = this;
    //把当前画布指定区域的内容导出生成指定大小的图片，并返回文件路径
    wx.canvasToTempFilePath({
      width: this.data.systemInfo.windowWidth,
      height: this.data.systemInfo.screenHeight,
      destWidth: this.data.systemInfo.windowWidth * 3,
      destHeight: this.data.systemInfo.screenHeight * 3,
      canvasId: 'myCanvas',
      success: function(res) {
        console.log(res)
        //预览图片
        wx.previewImage({
          urls: res.tempFilePath.split(','), // 需要预览的图片http链接列表
          fail: function(res) {
            console.log("预览图片失败" + res)
          }
        })
      },
      fail: function(res) {
        console.log("出错了:" + JSON.stringify(res));
      },
      complete: function() {
        wx.hideLoading();
      }
    })
  },


})