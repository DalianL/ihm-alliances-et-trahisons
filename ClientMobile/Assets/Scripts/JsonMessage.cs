using System;

namespace AssemblyCSharp
{
	[Serializable]
	public class JsonMessage
	{
		public string msg = "";
		public int sender = 0;
		public int recipient = 0;

		public JsonMessage ()
		{
			new JsonMessage ("", 0, 0);
		}

		public JsonMessage (string msg, int sender, int recipient)
		{
			this.msg = msg;
			this.sender = sender;
			this.recipient = recipient;
		}
	}
}

