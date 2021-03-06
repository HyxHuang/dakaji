const store = require('store')
const app =getApp()
Page({
  data: {
    user: {}
  },
  onShow() {

    let that = this
    wx.request({
      url: `${app.globalData.baseUrl}/api/profile`,
      data: {
        token: store.get('tk')
      },
      success(res) {
        if (res.data.code === 2000) {
          let {
            name,
            position,
            email,
            address,
            avatar
          } = res.data.data
          that.setData({
            user: {
              name,
              position,
              email,
              address,
              avatar
            }
          })
        }
      }
    })
  },
  handleSignout: function () {
    wx.showModal({
      title: '',
      content: '是否退出登录',
      cancelColor: '#DC143C',
      confirmColor: '#1c66ff',
      success(res) {
        if (res.confirm) {
          store.remove('tk')
          wx.reLaunch({
            url: '/pages/login/login',
          })
        } else if (res.cancel) {
        }
      }
    })

  }
})