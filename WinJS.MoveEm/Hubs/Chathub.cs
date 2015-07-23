using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WinJS.MoveEm.Hubs
{
    public class Chathub : Hub
    {
        public void Send(string name, string message)
        {
            // Call the broadcastMessage method to update clients. 
            Clients.All.broadcastMessage(name, message);
        }
    }
}
