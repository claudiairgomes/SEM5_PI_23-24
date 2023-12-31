using System;
using Mpt.Domain.Shared;
using Newtonsoft.Json;

namespace Mpt.Domain.SystemUsers
{
    public class SystemUserId : EntityId
    {
        [JsonConstructor]
        public SystemUserId(Guid value) : base(value)
        {
        }

        public SystemUserId(String value) : base(value)
        {
        }

        override
        protected  Object createFromString(String text){
            return new Guid(text);
        }

        override
        public String AsString(){
            Guid obj = (Guid) base.ObjValue;
            return obj.ToString();
        }
       
        public Guid AsGuid(){
            return (Guid) base.ObjValue;
        }
    }
}
