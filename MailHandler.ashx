<%@ WebHandler Language="C#" Class="Portfolio.MailHandler" %>

using System;
using System.Net;
using System.Net.Mail;
using System.ServiceModel.Channels;
using System.Web;
using System.Web.SessionState;

namespace Portfolio
{

    public class MailHandler : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            CreateMail(context);
        }

        protected void CreateMail(HttpContext context)
        {
            MailAddress from = new MailAddress("support@sphaluckyhlakaza.co.za", "Portfolio - New Contact Request");
            MailMessage message = new MailMessage { From = @from };

            try
            {
                SmtpClient client = new SmtpClient("mail.sphaluckyhlakaza.co.za");
                NetworkCredential SMTPUserInfo = new NetworkCredential("lucky@sphaluckyhlakaza.co.za", "Maboe62263");
                client.UseDefaultCredentials = false;
                client.Credentials = SMTPUserInfo;

                //string subject = context.Request.Form["subject"];
                string name = context.Request.Form["name"];
                string email = context.Request.Form["email"];
                string phone = context.Request.Form["phone"];
                string details = context.Request.Form["message"];
                // string type = context.Request.Form["type"];
                string body = "A new contact request has been received from Your website :\n\n";
                // body += "Subject" + subject + "\n";
                if (name != null && email != null){
                    body += "Name:   " + name + "\n";
                    body += "E-mail:  " + email + "\n";
                    body += "Telephone:  " + phone + "\n";
                    body += "Message:  " + details + "\n";

                    message.Body = body;
                    message.Subject = "Contact Request";
                    client.Send(message);
                    context.Response.Write("Success");
                    message.To.Add("nhlalucky9@gmail.com");
                }
                else
                {
                    context.Response.Write("Failed");

                }

            }
            catch (Exception ex)
            {
                context.Response.Write("{\"success\":false,\"message\":\"" + ex.Message + "\"}");
            }
            finally
            {
                message?.Dispose();
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}