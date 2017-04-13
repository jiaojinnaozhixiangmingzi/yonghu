module BCE
  class SMS
    include Singleton
    include ApiUtil

    def remind_44h(phone)
      return if Rails.env.development?
      
      ret = request(
        method: :post,
        host: 'sms.bj.baidubce.com',
        url: '/bce/v2/message',
        payload: {
          invokeId: '对应替换一下',
          phoneNumber: phone,
          templateCode: '对应替换一下'
        }
      )
      JSON.parse(ret)
    end
  end
end
