// pages/drawImg/drawImg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const ctx = wx.createCanvasContext('myCanvas')

    wx.chooseImage({
      success: function (res) {
        ctx.drawImage('../../images/banner.jpg', 0, 0, 150, 100)
        ctx.draw()
      }
    })
    
  },

})