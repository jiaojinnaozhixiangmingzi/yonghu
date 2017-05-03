class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  # GET /users
  # GET /users.json
  def index
    @users = User.all
  end

  # GET /users/1
  # GET /users/1.json
  def show
  end

  # GET /users/new
  def new
    @user = User.new
  end

  # GET /users/1/edit
  def edit
  end

  # POST /users
  # POST /users.json
  def create
    @user = User.new(create_params)

    respond_to do |format|
      if @user.save
        format.html { redirect_to @user, notice: 'User was successfully created.' }
        format.json { render :json => {:data => "succ"}.to_json }
      else
        format.html { render :new }
        format.json { render :json => {:data => "fail"}.to_json }
      end
    end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to users_url, notice: 'User was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def setPassword
    @user = User.where(["mobile = ? and reset_password_token = ? and reset_password_sent_at >= ?", params[:mobile],
                        params[:password_token], Time.new-1800])
    respond_to do |format|
      if @user.empty?
        format.json { render :json => {:data => "Set failed"}.to_json }
      else
        first = @user[0]
        session['mobile'] = first.mobile
        first.update_attributes(:encrypted_password => params[:encrypted_password])
        format.json { render :json => {:data => "Set succ "}.to_json }
      end
    end
  end

  def login
    @user = User.where(["mobile = ? and encrypted_password = ?", params[:mobile], params[:encrypted_password]])

    respond_to do |format|
      if @user.empty?
        format.json { render :json => {:data => "Login failed"}.to_json }
      else
        first = @user[0]
        session['mobile'] = first.mobile
        format.json { render :json => {:data => "Login succ",:msg =>first }.to_json }
      end
    end
  end

  def reset
    mobile = session['mobile']
    @user = User.where(["mobile = ? and encrypted_password = ?", mobile, params[:old_encrypted_password]])
    respond_to do |format|
      if @user.empty?
        format.json { render :json => {:data => "Reset failed"}.to_json }
      else
        first = @user[0]
        first.update_attributes(:encrypted_password => params[:new_encrypted_password])
        format.json { render :json => {:data => "Retset succ"}.to_json }
      end
    end
  end

  def registerEmail
    recipient = params[:mobile]
    subject = "验证码"
    message = rand(999999).to_s
    Emailer.contact(recipient, subject, message).deliver_now!

    @user = User.new(:mobile => recipient)
    @user.reset_password_token = message
    @user.reset_password_sent_at = Time.new

    respond_to do |format|
      if @user.save
        format.html { redirect_to @user, notice: 'User was successfully created.' }
        format.json { render :json => {:data => "Send succ"}.to_json }
      else
        format.html { render :new }
        format.json { render :json => {:data => "Send fail"}.to_json }
      end
    end
  end

  def resetEmail
    recipient = params[:mobile]
    subject = "验证码"
    message = rand(999999).to_s
    Emailer.contact(recipient, subject, message).deliver_now!

    @user = User.where(["mobile = ?",recipient])

    respond_to do |format|
      if @user.empty?
        format.json { render :json => {:data => "Send failed"}.to_json }
      else
        first = @user[0]
        first.update_attributes(:reset_password_token => message)
        first.update_attributes(:reset_password_sent_at => Time.new)
        format.json { render :json => {:data => "Send succ"}.to_json }
      end
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def user_params
    params.fetch(:user, {})
  end

  def create_params
    params.require(:user).permit(:mobile, :encrypted_password)
  end

end
