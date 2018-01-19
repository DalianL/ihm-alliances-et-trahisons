using System;

namespace AssemblyCSharp
{
	[Serializable]
	public class Player
	{
		public int id;
		public string pseudo;
		public string color;

		public Player ()
		{
			new Player (0,"", "");
		}

		public Player (int id, string pseudo, string color)
		{
			this.id = id;
			this.pseudo = pseudo;
			this.color = color;
		}
	}
}

