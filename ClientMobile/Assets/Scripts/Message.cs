using System;
using System.Collections.Generic;
using System.Collections;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace AssemblyCSharp
{
	[Serializable]
	public class Message
	{
		public int idPlayer = 0;
		public bool isSaw = true;
		public MessageEnum state;
		public Dictionary<ResourcesEnum, int> resourcesPlayer;
		public Dictionary<ResourcesEnum, int> resourcesOwn;

		public Message ()
		{
			new Message (0);
		}

		public Message (int p)
		{
			this.idPlayer = p;

			this.resourcesPlayer = new Dictionary<ResourcesEnum, int> ();
			this.resourcesOwn = new Dictionary<ResourcesEnum, int> ();

			this.resourcesPlayer [ResourcesEnum.RED_CRYSTAL_KYBER] = 0;
			this.resourcesPlayer[ResourcesEnum.GREEN_CRYSTAL_KYBER] = 0;
			this.resourcesPlayer[ResourcesEnum.BLUE_CRYSTAL_KYBER] = 0;
			this.resourcesPlayer[ResourcesEnum.VIOLET_CRYSTAL_KYBER] = 0;

			this.resourcesOwn [ResourcesEnum.RED_CRYSTAL_KYBER] = 0;
			this.resourcesOwn[ResourcesEnum.GREEN_CRYSTAL_KYBER] = 0;
			this.resourcesOwn[ResourcesEnum.BLUE_CRYSTAL_KYBER] = 0;
			this.resourcesOwn[ResourcesEnum.VIOLET_CRYSTAL_KYBER] = 0;

			this.isSaw = true;
			this.state = MessageEnum.SEND;
		}

		public void reset() {
			this.resourcesPlayer [ResourcesEnum.RED_CRYSTAL_KYBER] = 0;
			this.resourcesPlayer[ResourcesEnum.GREEN_CRYSTAL_KYBER] = 0;
			this.resourcesPlayer[ResourcesEnum.BLUE_CRYSTAL_KYBER] = 0;
			this.resourcesPlayer[ResourcesEnum.VIOLET_CRYSTAL_KYBER] = 0;

			this.resourcesOwn [ResourcesEnum.RED_CRYSTAL_KYBER] = 0;
			this.resourcesOwn[ResourcesEnum.GREEN_CRYSTAL_KYBER] = 0;
			this.resourcesOwn[ResourcesEnum.BLUE_CRYSTAL_KYBER] = 0;
			this.resourcesOwn[ResourcesEnum.VIOLET_CRYSTAL_KYBER] = 0;

			this.isSaw = true;
			this.state = MessageEnum.SEND;
		}

		public void edit(JObject node) {
			this.resourcesPlayer [ResourcesEnum.RED_CRYSTAL_KYBER] = (int)node ["resources_player"] ["0"];
			this.resourcesPlayer[ResourcesEnum.GREEN_CRYSTAL_KYBER] = (int)node ["resources_player"] ["1"];
			this.resourcesPlayer[ResourcesEnum.BLUE_CRYSTAL_KYBER] = (int)node ["resources_player"] ["2"];
			this.resourcesPlayer[ResourcesEnum.VIOLET_CRYSTAL_KYBER] = (int)node ["resources_player"] ["3"];

			this.resourcesOwn [ResourcesEnum.RED_CRYSTAL_KYBER] = (int)node ["resources_own"] ["0"];
			this.resourcesOwn[ResourcesEnum.GREEN_CRYSTAL_KYBER] = (int)node ["resources_own"] ["1"];
			this.resourcesOwn[ResourcesEnum.BLUE_CRYSTAL_KYBER] = (int)node ["resources_own"] ["2"];
			this.resourcesOwn[ResourcesEnum.VIOLET_CRYSTAL_KYBER] = (int)node ["resources_own"] ["3"];

			this.isSaw = false;
			this.state = MessageEnum.RECIEVE;
		}
	}
}

