class Emailer < ActionMailer::Base

  default from: '18600547596@163.com'

  def contact(recipient, subject, message)
    mail(:to=>recipient, :subject=>subject) do |format|
      format.html { render :text => message }
    end
  end
end
