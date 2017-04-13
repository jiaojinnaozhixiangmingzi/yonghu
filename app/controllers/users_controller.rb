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
    @user = User.new(user_login_params)

    respond_to do |format|
      if @user.save
        format.html { redirect_to @user, notice: 'User was successfully created.' }
        format.json { render :json => {:data => "succ"}.to_json}
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

  def login
    @user = User.where(["mobile = ? and encrypted_password = ?", params[:mobile], params[:encrypted_password]])
    recipient = '18600547596@163.com'
    subject ="测试"
    message = "<p>html邮件测试</p>"
    # Emailer.contact(recipient, subject, message).deliver
    # render :json => {:data => "Send succ!"}.to_json
    #  render :text=>'OK'
    respond_to do |format|
      if @user.empty?
        format.json { render :json => {:data => "Login failed"}.to_json }
      else
        format.json { render :json => {:data => "Login succ!"}.to_json }
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

  def user_login_params
    params.require(:user).permit(:mobile, :encrypted_password)
  end
end
