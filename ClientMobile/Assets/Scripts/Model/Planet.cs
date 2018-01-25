using System;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace AssemblyCSharp
{
	[Serializable]
	public class Planet
	{
		private int id;
		private string name;
		private int id_player;

		public int Id {
			get {
				return this.id;
			}
			set {
				this.id = value;
			}
		}

		public string Name {
			get {
				return this.name;
			}
			set {
				this.name = value;
			}
		}

		public int Id_player {
			get {
				return this.id_player;
			}
			set {
				this.id_player = value;
			}
		}

		public Planet ()
		{
			new Planet (0, "", 0);
		}

		public Planet (int id, string name, int player)
		{
			this.id = id;
			this.name = name;
			this.id_player = player;
		}

		public Planet (JObject node)
		{
			this.id = (int) node["id"];
			this.name = (string) node["name"];
			this.id_player = (int) node["id_player"];
		}
	}
}

